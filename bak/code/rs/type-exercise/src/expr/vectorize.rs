use std::marker::PhantomData;

use anyhow::Result;

use super::{cmp, string, Expression};
use crate::array::*;
use crate::scalar::Scalar;
use crate::TypeMismatch;
pub trait BinaryExprFunc<A: Scalar, B: Scalar, O: Scalar> {
    fn eval(&self, i1: A::RefType<'_>, i2: B::RefType<'_>) -> O;
}

impl<A: Scalar, B: Scalar, O: Scalar, F> BinaryExprFunc<A, B, O> for F
where
    for<'a> &'a A::ArrayType: TryFrom<&'a ArrayImpl, Error = TypeMismatch>,
    for<'a> &'a B::ArrayType: TryFrom<&'a ArrayImpl, Error = TypeMismatch>,
    F: Fn(A::RefType<'_>, B::RefType<'_>) -> O,
{
    fn eval(&self, i1: A::RefType<'_>, i2: B::RefType<'_>) -> O {
        self(i1, i2)
    }
}

// pub trait BinaryExprFunc<I1: Array, I2: Array, O: Array> {
//     fn eval(&self, i1: I1::RefItem<'_>, i2: I2::RefItem<'_>) -> O::OwnedItem;
// }

// impl<A: Array, B: Array, O: Array, F> BinaryExprFunc<A, B, O> for F
// where
//     F: Fn(A::RefItem<'_>, B::RefItem<'_>) -> O::OwnedItem,
// {
//     fn eval(&self, i1: A::RefItem<'_>, i2: B::RefItem<'_>) -> O::OwnedItem {
//         self(i1, i2)
//     }
// }

pub struct BinaryExpression<I1: Scalar, I2: Scalar, O: Scalar, F> {
    func: F,
    _phantom: PhantomData<(I1, I2, O)>,
}

impl<A: Scalar, B: Scalar, O: Scalar, F> Expression for BinaryExpression<A, B, O, F>
where
    for<'a> &'a A::ArrayType: TryFrom<&'a ArrayImpl, Error = TypeMismatch>,
    for<'a> &'a B::ArrayType: TryFrom<&'a ArrayImpl, Error = TypeMismatch>,
    F: BinaryExprFunc<A, B, O>,
{
    fn eval_expr(&self, data: &[&ArrayImpl]) -> Result<ArrayImpl> {
        self.eval_batch(data[0], data[1])
    }
}

impl<I1: Scalar, I2: Scalar, O: Scalar, F> BinaryExpression<I1, I2, O, F>
where
    for<'a> &'a I1::ArrayType: TryFrom<&'a ArrayImpl, Error = TypeMismatch>,
    for<'a> &'a I2::ArrayType: TryFrom<&'a ArrayImpl, Error = TypeMismatch>,
    F: BinaryExprFunc<I1, I2, O>,
    // for<'a> I1::ArrayType: Array<RefItem<'a> = O::RefType<'a>>,
    // for<'a> I2::ArrayType: Array<RefItem<'a> = O::RefType<'a>>,
    // for<'a> O::ArrayType: Array<RefItem<'a> = O::RefType<'a>>,
{
    pub fn new(f: F) -> Self {
        Self {
            func: f,
            _phantom: PhantomData,
        }
    }

    pub fn eval_batch(&self, i1: &ArrayImpl, i2: &ArrayImpl) -> Result<ArrayImpl> {
        let i1a: &I1::ArrayType = i1.try_into()?;
        let i2a: &I2::ArrayType = i2.try_into()?;
        assert_eq!(i1.len(), i2.len(), "array length mismatch");
        let mut builder: <O::ArrayType as Array>::Builder =
            <O::ArrayType as Array>::Builder::with_capacity(i1.len());
        for (i1, i2) in i1a.iter().zip(i2a.iter()) {
            match (i1, i2) {
                (Some(i1), Some(i2)) => builder.push(Some(O::cast_s_to_a(
                    (self.func)
                        .eval(I1::cast_a_to_s(i1), I2::cast_a_to_s(i2))
                        .as_scalar_ref(),
                ))),
                _ => builder.push(None),
            }
        }
        Ok(builder.finish().into())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn test_if_impl<A: Scalar, B: Scalar, O: Scalar, F: BinaryExprFunc<A, B, O>>(_: F) {}

    fn binary_str(_: &str, _: &str) -> String {
        todo!()
    }

    fn binary_generics<A: Scalar, B: Scalar, O: Scalar>(_: A::RefType<'_>, _: B::RefType<'_>) -> O {
        todo!()
    }

    #[test]
    fn test_simple_str_function() {
        // FIXME: test_if_impl(binary_str)
        //
        // Confusing compiler error with the above line:
        // ```plain
        // error[E0631]: type mismatch in function arguments
        //   --> archive/day6-hard/src/expr/vectorize.rs:99:22
        //    |
        // 89 |     fn binary_str(_: &str, _: &str) -> String {
        //    |     ----------------------------------------- found signature of `for<'r, 's> fn(&'r
        // str, &'s str) -> _` ...
        // 99 |         test_if_impl(binary_str)
        //    |         ------------ ^^^^^^^^^^ expected signature of `for<'r, 's> fn(<_ as
        // scalar::Scalar>::RefType<'r>, <_ as scalar::Scalar>::RefType<'s>) -> _`    |
        // |    |         required by a bound introduced by this call
        // ```

        test_if_impl::<String, String, String, _>(binary_str)
    }

    #[test]
    fn test_simple_generics_function() {
        test_if_impl::<i32, f32, i64, _>(binary_generics::<i32, f32, i64>)
    }

    use crate::array::{BoolArray, I32Array, StringArray};
    use crate::expr::cmp::*;
    use crate::expr::string::*;

    /// Test if an array has the same content as a vector
    fn check_array_eq<'a, A: Array>(array: &'a A, vec: &[Option<A::RefItem<'a>>])
    where
        A::RefItem<'a>: PartialEq,
    {
        for (a, b) in array.iter().zip(vec.iter()) {
            assert_eq!(&a, b);
        }
    }

    #[test]
    fn test_cmp_le() {
        // Compare two `i32` array. Cast them to `i64` before comparing.
        let expr = BinaryExpression::<i32, i32, bool, _>::new(cmp_le::<i32, i32, i64>);
        let result = expr
            .eval_batch(
                &I32Array::from_slice(&[Some(0), Some(1), None]).into(),
                &I32Array::from_slice(&[Some(1), Some(0), None]).into(),
            )
            .unwrap();
        check_array_eq::<BoolArray>(
            (&result).try_into().unwrap(),
            &[Some(true), Some(false), None],
        );
    }

    #[test]
    fn test_cmp_ge_str() {
        let expr =
            BinaryExpression::<String, String, bool, _>::new(cmp_ge::<String, String, String>);
        let result = expr
            .eval_batch(
                &StringArray::from_slice(&[Some("0"), Some("1"), None]).into(),
                &StringArray::from_slice(&[Some("1"), Some("0"), None]).into(),
            )
            .unwrap();
        check_array_eq::<BoolArray>(
            (&result).try_into().unwrap(),
            &[Some(false), Some(true), None],
        );
    }

    #[test]
    fn test_str_contains() {
        let expr = BinaryExpression::<String, String, bool, _>::new(str_contains);
        let result = expr
            .eval_batch(
                &StringArray::from_slice(&[Some("000"), Some("111"), None]).into(),
                &StringArray::from_slice(&[Some("0"), Some("0"), None]).into(),
            )
            .unwrap();
        check_array_eq::<BoolArray>(
            (&result).try_into().unwrap(),
            &[Some(true), Some(false), None],
        );
    }
}
