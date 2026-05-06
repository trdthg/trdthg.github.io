use std::collections::HashMap;

/// 问题描述：物品可分为 k 组，每组中的物品相互冲突
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    // 背包容量
    let m = sc.scan::<usize>();
    // 物品个数
    let n = sc.scan::<usize>();
    // 1. 确定树组：二维数组 dp[i][j]，i 表示第 i 个物品，j 表示背包容量
    // dp[i][j] 表示从 0..i 的物品里任意取的最大价值
    let mut map: HashMap<i32, Vec<(i32, i32)>> = HashMap::new();
    for _ in 0..n {
        let a: (i32, i32) = (sc.scan(), sc.scan());
        let group = sc.scan::<i32>();
        if map.contains_key(&group) {
            map.get_mut(&group).unwrap().push(a);
        } else {
            map.insert(group, vec![a]);
        }
    }
    let keys: Vec<&i32> = map.keys().collect();
    // 2. 确定递推公式 F(n) = F(n - 1) + F(n - 2)
    // 3. 初始化
    let mut dp = vec![vec![0; m + 1]; keys.len() + 1];
    // for i in 0..n {
    //     dp[i][0] = 0;
    // }
    // for i in 1..=m {
    //     dp[0][i] = if i as i32 >= wv[0].0 { wv[0].1 } else { 0 };
    // }
    for i in 1..=keys.len() {
        for j in 1..=m {
            for stuff in map.get(keys[i - 1]).unwrap() {
                if j >= stuff.0 as usize {
                    dp[i][j] = dp[i][j].max(dp[i - 1][j - stuff.0 as usize] + stuff.1);
                } else {
                    dp[i][j] = dp[i - 1][j]
                }
            }
        }
    }
    // for row in &dp {
    //     println!("{:?}", row);
    // }
    println!("{:?}", dp[keys.len()][m]);
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
