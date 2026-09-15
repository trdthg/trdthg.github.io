use std::fmt::Debug;

mod impls;
pub use impls::*;
use rust_decimal::Decimal;

use crate::array::Array;

pub trait Scalar: Debug + Clone + Send + Sync + 'static {
    type ArrayType: Array<OwnedItem = Self>;
    type RefType<'a>: ScalarRef<'a, ScalarType = Self>;
    fn as_scalar_ref(&self) -> Self::RefType<'_>;
    fn upcast_gat<'short, 'long: 'short>(long: Self::RefType<'long>) -> Self::RefType<'short>;
    fn cast_s_to_a<'a>(item: Self::RefType<'a>) -> <Self::ArrayType as Array>::RefItem<'a>;
    fn cast_a_to_s<'x>(item: <Self::ArrayType as Array>::RefItem<'x>) -> Self::RefType<'x>;
}

pub trait ScalarRef<'a>: Debug + Clone + Copy + Send + 'a {
    type ArrayType: Array<RefItem<'a> = Self>;
    type ScalarType: Scalar<RefType<'a> = Self>;
    fn to_owned_scalar(&self) -> Self::ScalarType;
}

#[derive(Debug, PartialEq, Clone)]
pub enum ScalarImpl {
    Int16(i16),
    Int32(i32),
    Int64(i64),
    Float32(f32),
    Float64(f64),
    String(String),
    Bool(bool),
    Decimal(Decimal),
}

#[derive(Debug, PartialEq, Clone, Copy)]
pub enum ScalarRefImpl<'a> {
    Int16(i16),
    Int32(i32),
    Int64(i64),
    Float32(f32),
    Float64(f64),
    String(&'a str),
    Bool(bool),
    Decimal(Decimal),
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::array::*;

    // These are two examples of using generics over array and scalar.
    //
    // These functions work for all kinds of scalars, no matter `String` or `i32`.

    /// Build an array from a vector of repeated data
    fn build_array_repeated<A: Array>(item: A::RefItem<'_>, len: usize) -> A {
        let mut builder = A::Builder::with_capacity(len);
        for _ in 0..len {
            builder.push(Some(item));
        }
        builder.finish()
    }

    /// Build an array from a vector of repeated owned data
    fn build_array_repeated_owned<A: Array>(item: A::OwnedItem, len: usize) -> A {
        let mut builder = A::Builder::with_capacity(len);
        for _ in 0..len {
            builder.push(Some(item.as_scalar_ref()));
        }
        builder.finish()
    }

    /// Test if an array has the same repeating content
    fn check_array_eq<'a, A: Array>(array: &'a A, item: A::RefItem<'a>)
    where
        A::RefItem<'a>: PartialEq,
    {
        for a in array.iter() {
            assert_eq!(a, Some(item));
        }
    }

    #[test]
    fn test_build_int32_repeat_array() {
        let array = build_array_repeated::<I32Array>(1, 233);
        check_array_eq(&array, 1);
        let array = build_array_repeated_owned::<I32Array>(1, 233);
        check_array_eq(&array, 1);
    }

    #[test]
    fn test_build_string_repeat_array() {
        let array = build_array_repeated::<StringArray>("233", 5);
        check_array_eq(&array, "233");
        let array = build_array_repeated_owned::<StringArray>("233".to_string(), 5);
        check_array_eq(&array, "233");
    }

    #[test]
    fn test_try_from_into() {
        let i: i32 = 2333;
        let j: ScalarImpl = i.into();
        let k: ScalarRefImpl = i.into();
        let i1: i32 = j.try_into().unwrap();
        let i2: i32 = k.try_into().unwrap();
        assert_eq!(i1, i);
        assert_eq!(i2, i);
    }
}
