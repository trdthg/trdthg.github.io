// 3
// 5 3 L
// 6 L L
// L 9 8

// 6
// 5 3 L L 7 L
// 6 L L 1 9 5
// L 9 8 L L L
// 8 L L L 6 L
// 4 L L 8 L 3
// 7 L L L 2 L
#![allow(unused)]
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let s = sc.scan::<usize>();
    let map = (0..s)
        .map(|_| (0..s).map(|_| sc.scan()).collect())
        .collect::<Vec<Vec<char>>>();
    let res = solve(map);
    for i in res {
        println!("{:?}", i);
    }
}

fn solve(map: Vec<Vec<char>>) -> Vec<Vec<char>> {
    let mut path = map.clone();
    backtracing(&mut path);
    path
}

// 1. 函数的参数和返回值
fn backtracing(path: &mut Vec<Vec<char>>) -> bool {
    for row in 0..path.len() {
        for col in 0..path.len() {
            // 不用填的点
            if path[row][col] != 'L' {
                continue;
            }
            // 不合法的点
            for c in '1'..='9' {
                if !is_valid(row, col, c, &path) {
                    continue;
                }
                path[row][col] = c;
                if backtracing(path) {
                    return true;
                }
                path[row][col] = 'L';
            }
            // 9 个都不合法，无解
            return false;
        }
    }
    true
}

fn is_valid(row: usize, col: usize, c: char, chessboard: &Vec<Vec<char>>) -> bool {
    for t in 0..chessboard.len() {
        // 检查行冲突
        if chessboard[row][t].eq(&c) {
            return false;
        }
        // 检查列冲突
        if chessboard[t][col].eq(&c) {
            return false;
        }
    }
    // 检查九宫格内冲突
    let start_row = row / 3 * 3;
    let start_col = col / 3 * 3;
    // 'out:
    for x in start_row..start_row + 3 {
        for y in start_col..start_col + 3 {
            // if x == row && y == col {
            //     break 'out;
            // }
            if chessboard[x][y] == c {
                return false;
            }
        }
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
