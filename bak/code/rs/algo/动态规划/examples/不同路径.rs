/// 问题描述：一个机器人位于一个 m x n 网格的左上角（起始点在下图中标记为 “Start” ）。
/// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
/// 问总共有多少条不同的路径？

fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let m = sc.scan::<usize>() as usize;
    let n = sc.scan::<usize>() as usize;
    let mut dp = (0..m)
        .map(|_| {
            (0..n)
                .map(|_| if sc.scan::<i32>() == 1 { -1 } else { 0 })
                .collect::<Vec<i32>>()
        })
        .collect::<Vec<Vec<i32>>>();
    // 1. 确定树组：二维数组来记录到达某一点的方法，i, j 表示第 i+1 行第 j+1 列    let mut dp = [[0; 30]; 30];
    // 2. 确定递推公式
    // dp[0][0] = 1
    // dp[0][1] = 1
    // dp[0][2] = 1
    // ...
    // dp[1][0] = dp[0][0] = 1
    // dp[1][1] = dp[1 - 1][1] + dp[1][1 - 1] = 2
    // dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    // 3. 初始化
    // dp[0] = 0 | 1; 不重要，不会有 0 价
    dp[0][0] = 1;
    // 4. 确定遍历顺序
    // dp[i] = dp[i - 1] + dp[i - 2], 一定是从前向后遍历
    // 5. 举例推导
    // 假如 n = 5
    // 1 2 3 5 8
    for i in 0..m {
        dp[i][0] = if dp[i][0] < 0 { 0 } else { 1 };
    }
    (0..n).for_each(|i| {
        dp[0][i] = if dp[0][i] < 0 { 0 } else { 1 };
    });
    for i in 1..m {
        for j in 1..n {
            dp[i][j] = if dp[i][j] < 0 {
                0
            } else {
                dp[i - 1][j] + dp[i][j - 1]
            };
        }
    }
    println!("{}", dp[m - 1][n - 1]);
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
