use std::io::BufRead;

fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let m = sc.scan::<i32>();
    let n = sc.scan::<i32>();
    let arr = (0..n).map(|_| sc.scan::<i32>()).collect();
    let res = solve(arr, m);
    println!("{res}");
}

fn solve(nums: Vec<i32>, target: i32) -> i32 {
    let mut l = 0;
    let mut r = nums.len() - 1;
    while l < r {
        let mid = l + (r - l) / 2; // 防止溢出
        match target.cmp(&nums[mid]) {
            std::cmp::Ordering::Equal => return mid as i32,
            std::cmp::Ordering::Less => r = mid - 1,
            std::cmp::Ordering::Greater => l = mid + 1,
        }
    }
    -1
}

#[cfg(test)]
mod test {
    use crate::solve;

    #[test]
    fn it_dhould_return_ok() {
        assert_eq!(solve(vec![1, 2, 3, 4, 7, 9, 10], 2), 1);
    }
    #[test]
    fn it_should_return_err() {
        assert_eq!(solve(vec![1, 2, 3, 4, 7, 9, 10], 8), -1);
    }
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
