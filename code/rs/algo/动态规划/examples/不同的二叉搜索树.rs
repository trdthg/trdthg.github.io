/// 问题描述：给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？

fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let n = sc.scan::<usize>() as usize;
    let mut dp = [0; 1024];
    // 1. 确定树组：二维数组来记录到达某一点的方法，i, j 表示第 i+1 行第 j+1 列    let mut dp = [[0; 30]; 30];
    // 2. 确定递推公式
    // dp[1] = 1
    // dp[2] = 2
    // dp[3] = dp[l] * dp[r]
    // ...
    // dp[1][0] = dp[0][0] = 1
    // dp[1][1] = dp[1 - 1][1] + dp[1][1 - 1] = 2
    // dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    // 3. 初始化
    // dp[0] = 0 | 1; 不重要，不会有 0 价
    dp[1] = 1;
    dp[0] = 1;
    dp[2] = 2;
    // 4. 确定遍历顺序
    // dp[i] = dp[i - 1] + dp[i - 2], 一定是从前向后遍历
    // 5. 举例推导
    // 假如 n = 5
    // 1 2 3 5 8
    let res = match n {
        n if n < 3 => dp[n],
        n => {
            for i in 3..=n {
                dp[i] = dp[i - 1] * 2;
                for j in 2..i as usize {
                    dp[i] += dp[j - 1] * dp[i - j];
                }
            }
            dp[n]
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
