use std::fmt::Debug;

mod impls;
mod iterator;
mod primitive_array;
mod string_array;

pub use impls::*;
pub use iterator::*;
pub use primitive_array::*;
pub use string_array::*;

use crate::scalar::Scalar;

pub trait Array: Send + Sync + Sized + 'static + TryFrom<ArrayImpl> + Into<ArrayImpl>
where
    for<'a> Self::OwnedItem: Scalar<RefType<'a> = Self::RefItem<'a>>,
{
    type Builder: ArrayBuilder<Array = Self>;

    type OwnedItem: Scalar<ArrayType = Self>;

    type RefItem<'a>: Copy + Debug;

    /// 返回一个引用
    fn get(&self, idx: usize) -> Option<Self::RefItem<'_>>;

    /// 总数量。
    fn len(&self) -> usize;

    /// 是否为空
    fn is_empty(&self) -> bool {
        self.len() == 0
    }

    fn iter(&self) -> ArrayIterator<Self>;

    fn from_slice(data: &[Option<Self::RefItem<'_>>]) -> Self {
        let mut builder = Self::Builder::with_capacity(data.len());
        for item in data {
            builder.push(*item);
        }
        builder.finish()
    }
}

pub trait ArrayBuilder {
    type Array: Array<Builder = Self>;

    fn with_capacity(capacity: usize) -> Self;

    fn push(&mut self, value: Option<<Self::Array as Array>::RefItem<'_>>);

    fn finish(self) -> Self::Array;
}

pub enum ArrayImpl {
    Int16(I16Array),
    Int32(I32Array),
    Int64(I64Array),
    Float32(F32Array),
    Float64(F64Array),
    Bool(BoolArray),
    String(StringArray),
    Decimal(DecimalArray),
}

pub enum ArrayBuilderImpl {
    Int16(I16ArrayBuilder),
    Int32(I32ArrayBuilder),
    Int64(I64ArrayBuilder),
    Float32(F32ArrayBuilder),
    Float64(F64ArrayBuilder),
    Bool(BoolArrayBuilder),
    String(StringArrayBuilder),
    Decimal(DecimalArrayBuilder),
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::TypeMismatch;

    // These are two examples of using generics over array.
    //
    // These functions work for all kinds of array, no matter fixed-length arrays like `I32Array`,
    // or variable-length ones like `StringArray`.

    /// Build an array from a vector of data
    fn build_array_from_vec<A: Array>(items: &[Option<A::RefItem<'_>>]) -> A {
        let mut builder = A::Builder::with_capacity(items.len());
        for item in items {
            builder.push(*item);
        }
        builder.finish()
    }

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
    fn test_build_int32_array() {
        let data = vec![Some(1), Some(2), Some(3), None, Some(5)];
        let array = build_array_from_vec::<I32Array>(&data[..]);
        check_array_eq(&array, &data[..]);
    }

    #[test]
    fn test_build_string_array() {
        let data = vec![Some("1"), Some("2"), Some("3"), None, Some("5"), Some("")];
        let array = build_array_from_vec::<StringArray>(&data[..]);
        check_array_eq(&array, &data[..]);
    }

    fn add_i32(i1: i32, i2: i32) -> i32 {
        i1 + i2
    }

    fn add_i32_vec(i1: I32Array, i2: I32Array) -> I32Array {
        let mut builder = I32ArrayBuilder::with_capacity(i1.len());
        for (a, b) in i1.iter().zip(i2.iter()) {
            builder.push(a.and_then(|a| b.map(|b| add_i32(a, b))));
        }
        builder.finish()
    }

    fn add_i32_wrapper(i1: ArrayImpl, i2: ArrayImpl) -> Result<ArrayImpl, TypeMismatch> {
        Ok(add_i32_vec(i1.try_into()?, i2.try_into()?).into())
    }

    #[test]
    fn test_add_array() {
        check_array_eq::<I32Array>(
            &add_i32_wrapper(
                I32Array::from_slice(&[Some(1), Some(2), Some(3), None]).into(),
                I32Array::from_slice(&[Some(1), Some(2), None, Some(4)]).into(),
            )
            .unwrap()
            .try_into()
            .unwrap(),
            &[Some(2), Some(4), None, None],
        );

        let result = add_i32_wrapper(
            StringArray::from_slice(&[Some("1"), Some("2"), Some("3"), None]).into(),
            I32Array::from_slice(&[Some(1), Some(2), None, Some(4)]).into(),
        );
        assert!(result.is_err());
        if let Err(err) = result {
            assert_eq!(err.0, "Int32");
            assert_eq!(err.1, "String");
        }
    }
}
