/// 问题描述：装的下 C(1 <= C <=50,000) 立方的稻草
/// H(1 <= H <= 5,000) 捆体积不同的稻草
/// 每一捆稻草有它自己的体积 (1 <= Vi <= C)。
/// 在不超过马车最大容积的情况下买到最大体积的稻草
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    // 最大容量
    let m = sc.scan::<usize>();
    // 总捆束
    let n = sc.scan::<usize>();
    // 每捆的体积
    let wv = (0..n).map(|_| sc.scan()).collect::<Vec<usize>>();

    // dp 二维数组 dp[i][j] 表示 0..i 随便拿的最大体积
    let mut dp = vec![vec![0; m + 1]; n + 1];
    // 递推公式
    // dp[i][j] = max(dp[i][j - 1], dp[i - 1][j - wv[i]] + wv[i])
    // 初始化
    for i in 1..=m {
        dp[1][i] = if i < wv[0] { 0 } else { wv[0] }
    }
    for i in 1..=n {
        for j in 1..=m {
            if j < wv[i - 1] {
                dp[i][j] = dp[i - 1][j];
                continue;
            }
            dp[i][j] = dp[i][j].max(dp[i - 1][j - wv[i - 1]] + wv[i - 1]);
        }
        if dp[i][m] == m {
            println!("{:?}", dp[n][m]);
            return;
        }
    }
    println!("{:?}", dp[n][m]);
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
