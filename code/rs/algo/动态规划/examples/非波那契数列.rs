/// 问题描述：F(n) = F(n - 1) + F(n - 2)
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let m = sc.scan::<usize>() as u32;
    // 1. 确定树组：一维数组存储结果，下标表示第 i 个值
    let mut dp = [0; 30];
    // 2. 确定递推公式 F(n) = F(n - 1) + F(n - 2)
    // 3. 初始化
    dp[0] = 1;
    dp[1] = 1;
    // 4. 确定遍历顺序
    // dp[i] = dp[i - 1] + dp[i - 2], 一定是从前向后遍历
    // 5. 举例推导
    // 假如 n = 7
    // 1 1 2 3 5 8 13

    let res = match m {
        1 | 2 => 1,
        n => {
            for i in 2..n as usize {
                dp[i] = dp[i - 1] + dp[i - 2];
            }
            dp[(n - 1) as usize]
        }
    };
    println!("{}", res);
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
