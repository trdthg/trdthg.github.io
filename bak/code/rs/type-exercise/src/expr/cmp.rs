use std::cmp::Ordering;

use crate::array::Array;
use crate::scalar::{Scalar, ScalarRef};

// pub fn cmp_le<I1: Array, I2: Array, C: Array>(i1: I1::RefItem<'_>, i2: I2::RefItem<'_>) -> bool
// where
//     for<'a> I1::RefItem<'a>: Into<C::RefItem<'a>>,
//     for<'a> I2::RefItem<'a>: Into<C::RefItem<'a>>,
//     // 下面这一句利用了 PartialOrd 的 RHs，统一了生命周期
//     // 对于没有提供 RHs 的，可能就寄了
//     for<'a, 'b> C::RefItem<'a>: PartialOrd<C::RefItem<'b>>,
// {
//     i1.into().partial_cmp(&i2.into()).unwrap() == Ordering::Less
// }

// pub fn cmp_ge<I1: Array, I2: Array, C: Array>(i1: I1::RefItem<'_>, i2: I2::RefItem<'_>) -> bool
// where
//     for<'a> I1::RefItem<'a>: Into<C::RefItem<'a>>,
//     for<'a> I2::RefItem<'a>: Into<C::RefItem<'a>>,
//     for<'a, 'b> C::RefItem<'a>: PartialOrd<C::RefItem<'b>>,
// {
//     i1.into().partial_cmp(&i2.into()).unwrap() == Ordering::Greater
// }

// pub fn cmp_eq<I1: Array, I2: Array, C: Array>(i1: I1::RefItem<'_>, i2: I2::RefItem<'_>) -> bool
// where
//     for<'a> I1::RefItem<'a>: Into<C::RefItem<'a>>,
//     for<'a> I2::RefItem<'a>: Into<C::RefItem<'a>>,
//     for<'a, 'b> C::RefItem<'a>: PartialOrd<C::RefItem<'b>>,
// {
//     i1.into().partial_cmp(&i2.into()).unwrap() == Ordering::Equal
// }

pub fn cmp_le<I1: Scalar, I2: Scalar, C: Scalar>(i1: I1::RefType<'_>, i2: I2::RefType<'_>) -> bool
where
    for<'a> I1::RefType<'a>: Into<C::RefType<'a>>,
    for<'a> I2::RefType<'a>: Into<C::RefType<'a>>,
    for<'a> C::RefType<'a>: PartialOrd,
{
    let i1 = I1::upcast_gat(i1);
    let i2 = I2::upcast_gat(i2);
    i1.into().partial_cmp(&i2.into()).unwrap() == Ordering::Less
}

pub fn cmp_ge<I1: Scalar, I2: Scalar, C: Scalar>(i1: I1::RefType<'_>, i2: I2::RefType<'_>) -> bool
where
    for<'a> I1::RefType<'a>: Into<C::RefType<'a>>,
    for<'a> I2::RefType<'a>: Into<C::RefType<'a>>,
    for<'a> C::RefType<'a>: PartialOrd,
{
    let i1 = I1::upcast_gat(i1);
    let i2 = I2::upcast_gat(i2);
    i1.into().partial_cmp(&i2.into()).unwrap() == Ordering::Greater
}

pub fn cmp_eq<I1: Scalar, I2: Scalar, C: Scalar>(i1: I1::RefType<'_>, i2: I2::RefType<'_>) -> bool
where
    for<'a> I1::RefType<'a>: Into<C::RefType<'a>>,
    for<'a> I2::RefType<'a>: Into<C::RefType<'a>>,
    for<'a> C::RefType<'a>: PartialOrd,
{
    let i1 = I1::upcast_gat(i1);
    let i2 = I2::upcast_gat(i2);
    i1.into().eq(&i2.into())
}

pub fn cmp_ne<I1: Scalar, I2: Scalar, C: Scalar>(i1: I1::RefType<'_>, i2: I2::RefType<'_>) -> bool
where
    for<'a> I1::RefType<'a>: Into<C::RefType<'a>>,
    for<'a> I2::RefType<'a>: Into<C::RefType<'a>>,
    for<'a> C::RefType<'a>: PartialOrd,
{
    let i1 = I1::upcast_gat(i1);
    let i2 = I2::upcast_gat(i2);
    !i1.into().eq(&i2.into())
}
