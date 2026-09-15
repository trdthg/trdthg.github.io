/// 问题描述：规定两个基因的相似度为所有对应方法中，相似度最大的那个。
/// ![洛谷题解参考图](https://cdn.luogu.com.cn/upload/image_hosting/tylpht0w.png)
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    sc.scan::<usize>();
    let m = sc.scan::<String>().chars().collect::<Vec<char>>();
    sc.scan::<usize>();
    let n = sc.scan::<String>().chars().collect::<Vec<char>>();
    // dp 二维数组 dp[i][j] 表示 长度为 i 和 j 的子串的匹配值
    let mut dp = vec![vec![0; n.len() + 1]; m.len() + 1];
    for i in 1..=n.len() {
        dp[0][i] = dp[0][i - 1] + cmp('-', n[i - 1]);
    }
    for i in 1..=m.len() {
        dp[i][0] = dp[i - 1][0] + cmp('-', m[i - 1]);
    }
    // 递推公式
    // 4 - 3
    // dp[i][j] = max(
    //    dp[i-1][j-1] + cmp(m[i], n[j]) 3 - 2 + cmp()
    //    dp[i][j-1]  + cmp('-', n[j]) 3 - 3 + cmp(上一层多的，'-')
    //    dp[i-1][j]  + cmp('-', m[j]) 4 - 2 + cmp(下一层多的，'-')
    //)
    for i in 1..=m.len() {
        for j in 1..=n.len() {
            dp[i][j] = (dp[i - 1][j - 1] + cmp(m[i - 1], n[j - 1]))
                .max((dp[i - 1][j] + cmp('-', m[i - 1])).max(dp[i][j - 1] + cmp('-', n[j - 1])));
        }
    }
    println!("{:?}", dp[m.len()][n.len()]);
}

fn cmp(a: char, b: char) -> i32 {
    match (a, b) {
        ('A', 'A') => 5,
        ('A', 'C') => -1,
        ('A', 'G') => -2,
        ('A', 'T') => -1,
        ('A', '-') => -3,

        ('C', 'A') => -1,
        ('C', 'C') => 5,
        ('C', 'G') => -3,
        ('C', 'T') => -2,
        ('C', '-') => -4,

        ('G', 'A') => -2,
        ('G', 'C') => -3,
        ('G', 'G') => 5,
        ('G', 'T') => -2,
        ('G', '-') => -2,

        ('T', 'A') => -1,
        ('T', 'C') => -2,
        ('T', 'G') => -2,
        ('T', 'T') => 5,
        ('T', '-') => -1,

        ('-', 'A') => -3,
        ('-', 'C') => -4,
        ('-', 'G') => -2,
        ('-', 'T') => -1,
        ('-', '-') => panic!("'-' can't compare with '-'"),
        _ => panic!("unsupported char"),
    }
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
