/// 问题描述：有 n 场直播比赛，每场比赛的开始、结束时间已知，求最多可以看多少场比赛。
///     每场比赛从开头完整看到结尾才算观看完一场比赛。
///
/// 输入：第 1 行是 1 个整数 n；
/// 接下来 n 行，每行 2 个整数 ai、bi，表示比赛开始、结束的时间。
///
/// 思路：把比赛按照结束时间排序
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let n = sc.scan::<u32>();
    if n == 0 {
        println!("0");
        return;
    }
    let mut arr: Vec<(u32, u32)> = (0..n).map(|_| (sc.scan(), sc.scan())).collect();
    arr.sort_by(|a, b| a.1.cmp(&b.1));
    let mut x = 1;
    let mut arr = arr.iter();
    let first = arr.next().unwrap();
    arr.fold(first, |acc, next| {
        if first.1 <= next.0 {
            x += 1;
            next
        } else {
            acc
        }
    });
    println!("{}", x);
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
