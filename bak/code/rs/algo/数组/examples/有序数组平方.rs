fn main() {}

fn solve(arr: Vec<i32>) -> Vec<i32> {
    let mut l = 0;
    let mut r = arr.len() - 1;
    let mut res = Vec::with_capacity(arr.len());
    loop {
        match arr[l].abs().cmp(&arr[r].abs()) {
            std::cmp::Ordering::Less => {
                res.push(arr[r].pow(2));
                r -= 1;
            }
            std::cmp::Ordering::Equal => {
                res.push(arr[r].pow(2));
                res.reverse();
                return res;
            }
            std::cmp::Ordering::Greater => {
                res.push(arr[l].pow(2));
                l += 1;
            }
        }
    }
}

#[cfg(test)]
mod test {
    use crate::solve;

    #[test]
    fn it_should_ok() {
        assert_eq!(solve(vec![-4, -1, 0, 3, 10]), vec![0, 1, 9, 16, 100])
    }
}
