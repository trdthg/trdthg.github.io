/// 问题描述：找出所有相加之和为 n 的 k 个数的组合。
/// 组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。
use std::io::BufRead;

// 3 7
// [[1, 2, 4]]
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let k = sc.scan::<usize>();
    let n = sc.scan::<usize>();
    // 4 2
    // 1 2 3 4 -> [1 2, 1 3, 1 4, 2 3, 2 4, 3 4]
    let res = solve(n, k);
    println!("{:?}", res);
}

fn solve(n: usize, k: usize) -> Vec<Vec<usize>> {
    let mut res = vec![];
    let mut path = vec![];
    backtracing(n, k, 1, 0, &mut res, &mut path);
    res
}

// 1. 函数的参数和返回值
fn backtracing(
    n: usize,           // 和
    k: usize,           // k 个数
    start_index: usize, // 开始索引
    sum: usize,         // 临时总合
    res: &mut Vec<Vec<usize>>,
    path: &mut Vec<usize>,
) {
    if path.len() == k {
        if sum == n {
            res.push(path.clone());
        }
        return;
    }
    if n + path.len() - start_index < k {
        return;
    }
    // dbg!(start_index, n);
    for i in start_index..=n {
        path.push(i);
        // dbg!(&path);
        backtracing(n, k, i + 1, sum + i, res, path);
        path.pop();
    }
}

#[cfg(test)]
mod test {
    use super::solve;

    #[test]
    fn it_dhould_return_ok() {
        assert_eq!(solve(7, 3), vec![vec![1, 2, 4]]);
        assert_eq!(
            solve(9, 3),
            vec![vec![1, 2, 6], vec![1, 3, 5], vec![2, 3, 4]]
        );
    }
    #[test]
    fn it_should_return_err() {}
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
