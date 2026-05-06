/// 问题描述：F(n) = F(n - 1) + F(n - 2)
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    // 树塔层数
    let m = sc.scan::<usize>();
    let wv = (1..=m)
        .map(|i| (0..i).map(|_| sc.scan()).collect())
        .collect::<Vec<Vec<i32>>>();
    // 2. 确定递推公式

    // dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1]
    
    // 3. 初始化
    // dp[i][j] 表示到第 i 层第 j 个位置的最高价值
    let mut dp = vec![vec![0; m + 1]; m + 1];
    dp[1][1] = wv[0][0];
    // 4. 确定遍历顺序
    // 从上到下
    // 5. 举例推导

    for i in 2..=m {
        for j in 1..=i {
            dp[i][j] = dp[i - 1][j].max(dp[i - 1][j - 1]) + wv[i - 1][j - 1];
        }
    }

    println!("{:?}", dp[m].iter().max().unwrap());
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
