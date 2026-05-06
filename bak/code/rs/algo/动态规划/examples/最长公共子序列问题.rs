/// 问题描述：要求输入两个字符序列，
/// 求出这两个字符序列的最长公共子序列长度，
/// 并输出最长公共子序列。
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let m = sc.scan::<String>().chars().collect::<Vec<char>>();
    let n = sc.scan::<String>().chars().collect::<Vec<char>>();
    // dp 二维数组 dp[i][j] 表示 长度为 i 和 j 的子串的最长公共子序列
    let mut dp = vec![vec![0; n.len() + 1]; m.len() + 1];
    // 递推公式
    // dp[i][j] = dp[i-1][j-1] + 1  或者  max(dp[i-1][j], dp[i][j-1])
    for i in 1..=m.len() {
        for j in 1..=n.len() {
            dp[i][j] = if m[i - 1] == n[j - 1] {
                dp[i - 1][j - 1] + 1
            } else {
                dp[i - 1][j].max(dp[i][j - 1])
            };
        }
    }
    for row in &dp {
        for col in row {
            print!("{} ", col);
        }
        println!();
    }
    println!("{:?}", dp[m.len()][n.len()]);
}

struct Scanner<R: std::io::BufRead> {
    reader: R,
    buf: std::str::SplitAsciiWhitespace<'static>,
    buff: Vec<u8>,
}

impl<R: std::io::BufRead> Scanner<R> {
    pub fn new(reader: R) -> Self {
        Scanner {
            reader,
            buf: "".split_ascii_whitespace(),
            buff: vec![],
        }
    }
    pub fn scan<T: std::str::FromStr>(&mut self) -> T {
        loop {
            if let Some(s) = self.buf.next() {
                return s.parse().ok().unwrap();
            } else {
                self.buff.clear();
                self.reader.read_until(b'\n', &mut self.buff).unwrap();
                self.buf = unsafe {
                    std::mem::transmute(
                        std::str::from_utf8_unchecked(&self.buff).split_ascii_whitespace(),
                    )
                };
            }
        }
    }
}
