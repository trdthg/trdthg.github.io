use bitvec::prelude::BitVec;

use super::iterator::ArrayIterator;
use super::{Array, ArrayBuilder};
use crate::Scalar;
/// 存储变长数据
///
/// Vec<Option<String>> 需要创建一个 String 对象
/// 连续读取 String 对于缓存不友好，String 是一个指针，数据则散落在内存各处，属于随机读
pub struct StringArray {
    /// 实际数据
    data: Vec<u8>,
    /// 每个字符串的偏移量
    offsets: Vec<usize>,
    /// 位图
    bitmap: BitVec,
}

impl Array for StringArray {
    type Builder = StringArrayBuilder;

    type OwnedItem = String;

    type RefItem<'a> = &'a str;

    fn get(&self, idx: usize) -> Option<Self::RefItem<'_>> {
        if !self.bitmap[idx] {
            return None;
        }
        let range = self.offsets[idx]..self.offsets[idx + 1];
        let res = unsafe { std::str::from_utf8_unchecked(&self.data[range]) };
        Some(res)
    }
    fn len(&self) -> usize {
        self.bitmap.len()
    }

    fn iter(&self) -> super::iterator::ArrayIterator<Self>
    where
        Self: Sized,
    {
        ArrayIterator::new(self)
    }
}

pub struct StringArrayBuilder {
    data: Vec<u8>,
    bitmap: BitVec,
    offsets: Vec<usize>,
}
impl ArrayBuilder for StringArrayBuilder {
    type Array = StringArray;

    fn with_capacity(capacity: usize) -> Self {
        let mut offsets = Vec::with_capacity(capacity + 1);
        offsets.push(0);
        Self {
            data: Vec::with_capacity(capacity),
            bitmap: BitVec::with_capacity(capacity),
            offsets,
        }
    }

    fn push(&mut self, value: Option<<Self::Array as Array>::RefItem<'_>>) {
        match value {
            Some(v) => {
                self.data.extend(v.as_bytes());
                self.bitmap.push(true);
            }
            None => {
                self.bitmap.push(false);
            }
        }
        self.offsets.push(self.data.len());
    }

    fn finish(self) -> Self::Array {
        Self::Array {
            data: self.data,
            bitmap: self.bitmap,
            offsets: self.offsets,
        }
    }
}

fn sql_func<'a, I: Array, O: Array>(i1: I::RefItem<'a>, i2: I::RefItem<'a>) -> O::OwnedItem {
    todo!()
}

fn eval_binary<I: Array, O: Array>(i1: I, i2: I) -> O {
    assert_eq!(i1.len(), i2.len(), "size mismatch");

    let mut builder = O::Builder::with_capacity(i1.len());

    for (i1, i2) in i1.iter().zip(i2.iter()) {
        match (i1, i2) {
            (Some(i1), Some(i2)) => builder.push(Some(sql_func::<I, O>(i1, i2).as_scalar_ref())),
            _ => builder.push(None),
        }
    }
    builder.finish()
}
