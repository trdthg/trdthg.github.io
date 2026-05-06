fn main() {}

fn solve(arr: Vec<i32>, target: i32) -> i32 {
    let mut p = 0;
    let mut res = arr.len() + 1;
    let mut sum = 0;
    for i in 0..arr.len() {
        if arr[i] + sum < target {
            sum += arr[i];
        } else {
            res = res.min(i - p);
            sum -= arr[p];
            p += 1;
        }
    }
    if res == arr.len() + 1 {
        return -1;
    }
    res as i32 - 1
}
#[cfg(test)]
mod test {
    use crate::solve;

    #[test]
    fn it_should_ok() {
        assert_eq!(solve(vec![2, 3, 1, 2, 4, 3], 7), 2);
    }
}
