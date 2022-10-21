/// 问题描述：现有 n 堆果子，每一堆果子有一个质量 wi，现要把所有果子按照如下规则合并成一堆：
/// (1) 每次只能选择某两堆合并成一堆；
/// (2) 每次合并消耗体力值为两堆果子质量之和；(3) 问合并成一堆所花费的最小体力值是多少。
///
/// 输入：
///     第一行 1 个数字 n，表示 n 堆果子
///     第二行 n 个数字 wi，表示第 i 堆果子质量为 wi。
/// 输出：一个数字，表示最小需花费的体力值。
///
/// 通过栈相加

fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let n = sc.scan::<u32>();
    let mut weights: Vec<u32> = (0..n).map(|_| sc.scan()).collect();

    // 倒序排列，方便 pop, push 9 3 1
    weights.sort_by(|a, b| b.cmp(a));

    let mut sum = 0;
    while weights.len() != 1 {
        let x = weights.pop().unwrap();
        let y = weights.pop().unwrap();
        sum += x + y;
        weights.push(x + y);
        weights.sort_by(|a, b| b.cmp(a));
    }
    println!("{}", sum);
}

fn _main2() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    let n = sc.scan::<u32>();
    let mut weights = &mut (0..n).map(|_| sc.scan()).collect::<Vec<u32>>()[..];

    // 1 2 9
    weights.sort_by(|a, b| a.cmp(b));

    let mut sum = 0;
    while weights.len() > 1 {
        sum += weights[0] + weights[1];
        weights[1] = sum;
        weights = weights.split_at_mut(1).1;
        weights.sort_by(|a, b| a.cmp(b));
        // let mut index = 0;
        // while index < weights.len() - 1 && weights[index] > weights[index + 1] {
        //     weights.swap(index, index + 1);
        //     index += 1;
        // }
    }
    println!("{}", sum);
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
