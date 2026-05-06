/// 问题描述:有 n 户人家坐落在从西向东的一条街上。
/// 从街西头向东数，第 i 户的房子与街西头的距离是 H[i]米，(1≤i≤n)，
/// H[1]< H[2] < H[3] … < H[n]
/// 要在街上建一些邮局使得[任一户人家到最近一个邮局的距离不超过 1000 米]
///
/// 请设计一个 O(n)时间的算法以确定[最少需要建的邮局数]，并给出每个[邮局到街西头的距离]。
///
/// 贪即可

fn main() -> std::io::Result<()> {
    let input = std::io::stdin();
    let mut sc = Scanner::new(input.lock());
    let n = sc.scan::<u32>();
    let mut arr: Vec<u32> = (0..n).map(|_| sc.scan()).collect();
    arr.insert(0, 0);
    let res = solve(arr);
    res.iter().for_each(|x| println!("{x}"));
    Ok(())
}

fn solve(homes: Vec<u32>) -> Vec<u32> {
    let mut posts = vec![];
    posts.push(homes[0] + 1000);
    for home in homes.iter() {
        if home > &(posts.last().unwrap() + 1000) {
            posts.push(home + 1000);
        }
    }
    if posts.last() > homes.last() {
        *posts.last_mut().unwrap() = *homes.last().unwrap();
    }
    posts
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
