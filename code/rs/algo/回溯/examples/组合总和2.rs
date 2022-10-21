/// 问题描述：找出所有相加之和为 target 的组合。
/// 给定一个无重复元素的数组 candidates 和一个目标数 target ，
/// candidates 中的数字可以无限制重复被选取。
use std::io::BufRead;

// 7
// 10 1 2 7 6 1 5
// 8
//
// [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]

// 5
// 2 5 2 1 2
// 5

// [[1, 2, 2], [5]]
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);

    let k = sc.scan::<i32>();
    let mut arr = (0..k).map(|_| sc.scan()).collect::<Vec<i32>>();
    let target = sc.scan::<i32>();

    // 4 2
    // 1 2 3 4 -> [1 2, 1 3, 1 4, 2 3, 2 4, 3 4]
    let res = solve(&mut arr, target);
    println!("{:?}", res);
}

fn solve(arr: &mut Vec<i32>, target: i32) -> Vec<Vec<i32>> {
    let mut res = vec![];
    let mut path = vec![];
    let mut used = vec![];
    arr.sort();
    backtracing(target, arr, 0, 0, &mut used, &mut res, &mut path);
    res
}

// 1. 函数的参数和返回值
fn backtracing(
    target: i32,        // 和
    arr: &Vec<i32>,     // k 个数
    start_index: usize, // 开始索引
    sum: i32,           // 临时总合
    used: &mut Vec<i32>,
    res: &mut Vec<Vec<i32>>,
    path: &mut Vec<i32>,
) {
    if sum > target {
        return;
    }
    if sum == target {
        res.push(path.clone());
        return;
    }
    // dbg!(start_index, n);
    for i in start_index..arr.len() as usize {
        if i > start_index && arr[i] == arr[i - 1] {
            // println!("{} {} {}", arr[i], arr[i - 1], arr[i] == arr[i - 1]);
            continue;
        }
        path.push(arr[i]);
        // dbg!(&path);
        backtracing(target, arr, i + 1, sum + arr[i], used, res, path);
        path.pop();
    }
}

#[cfg(test)]
mod test {
    use super::solve;

    #[test]
    fn it_dhould_return_ok() {
        assert_eq!(1, 1);
    }
    // #[test]
    // fn it_should_return_err() {
    //     assert_eq!(solve(vec![1, 2, 3, 4, 7, 9, 10], 8), -1);
    // }
}

struct Scanner<'a> {
    reader: std::io::BufReader<std::io::Stdin>,
    buffer: std::str::SplitAsciiWhitespace<'a>,
    buf: String,
}

impl<'a> Scanner<'a> {
    fn new(reader: std::io::Stdin) -> Self {
        Self {
            reader: std::io::BufReader::new(reader),
            buffer: "".split_ascii_whitespace(),
            buf: String::new(),
        }
    }

    fn scan<T: std::str::FromStr>(&mut self) -> T {
        loop {
            if let Some(s) = self.buffer.next() {
                return s.parse().ok().unwrap();
            } else {
                self.buf.clear();
                self.reader.read_line(&mut self.buf).unwrap();
                self.buffer = unsafe { std::mem::transmute(self.buf.split_ascii_whitespace()) };
            }
        }
    }
}
