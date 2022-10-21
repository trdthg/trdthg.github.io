#![allow(non_snake_case)]

// 4
// ['L', 'Q', 'L', 'L']
// ['L', 'L', 'L', 'Q']
// ['Q', 'L', 'L', 'L']
// ['L', 'L', 'Q', 'L']

// ['L', 'L', 'Q', 'L']
// ['Q', 'L', 'L', 'L']
// ['L', 'L', 'L', 'Q']
// ['L', 'Q', 'L', 'L']
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let s = sc.scan::<usize>();
    let res = solve(s);
    // println!("{:?}", res);
    for i in res {
        for row in i {
            println!("{:?}", row);
        }
        println!();
    }
}

fn solve(n: usize) -> Vec<Vec<Vec<char>>> {
    let mut res = vec![];
    let mut path = vec![vec!['L'; n]; n];
    backtracing(n, 0, &mut res, &mut path);
    res
}

// 1. 函数的参数和返回值
fn backtracing(n: usize, row: usize, res: &mut Vec<Vec<Vec<char>>>, path: &mut Vec<Vec<char>>) {
    if row == n {
        res.push(path.clone());
        return;
    }
    for col in 0..n {
        if !is_valid(row, col, &path) {
            continue;
        }
        path[row][col] = 'Q';
        backtracing(n, row + 1, res, path);
        path[row][col] = 'L';
    }
}

fn is_valid(row: usize, col: usize, chessboard: &Vec<Vec<char>>) -> bool {
    // 假如前三行都有，现在要检查第四行
    // 检查列冲突
    for i in 0..row {
        if chessboard[i][col].eq(&'Q') {
            return false;
        }
    }
    // 检查 45
    let mut n = 1;
    for i in (0..row).rev() {
        if col + n == chessboard.len() {
            break;
        }
        if chessboard[i][col + n].eq(&'Q') {
            return false;
        }
        n += 1;
    }
    // 检查 135
    n = 1;
    for i in (0..row).rev() {
        if col < n {
            break;
        }
        if chessboard[i][col - n].eq(&'Q') {
            return false;
        }
        n += 1;
    }
    true
}

#[cfg(test)]
mod test {
    use super::solve;

    #[test]
    fn it_dhould_return_ok() {
        assert_eq!(2 * 2, 4);
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
                std::io::BufRead::read_line(&mut self.reader, &mut self.buf).unwrap();
                self.buffer = unsafe { std::mem::transmute(self.buf.split_ascii_whitespace()) };
            }
        }
    }
}
