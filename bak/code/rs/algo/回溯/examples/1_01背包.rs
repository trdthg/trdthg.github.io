fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let max_weight = sc.scan::<usize>();
    let n = sc.scan::<usize>();
    let stuffs = (0..n)
        .map(|_| (sc.scan::<usize>(), sc.scan::<usize>()))
        .collect();
    let res = solve(max_weight, &stuffs);
    println!("{:?}", res);
}

fn solve(max_weight: usize, stuffs: &Vec<(usize, usize)>) -> Vec<Vec<usize>> {
    let mut other = Other {
        res: vec![],
        path: vec![],
    };
    let mut max_value = 0;
    backtracing(max_weight, stuffs, 0, 0, &mut max_value, 0, &mut other);
    println!("{}", max_value);
    other.res
}

struct Other {
    res: Vec<Vec<usize>>,
    path: Vec<usize>,
}

// 1. 函数的参数和返回值
fn backtracing(
    max_weight: usize,
    stuffs: &Vec<(usize, usize)>,
    current_weight: usize,
    current_value: usize,
    max_value: &mut usize,
    start_index: usize,
    other: &mut Other,
) {
    if current_weight > max_weight {
        return;
    }
    if current_value >= *max_value {
        *max_value = current_value;
    }
    other.res.push(other.path.clone());

    for i in start_index..stuffs.len() {
        other.path.push(i);
        backtracing(
            max_weight,
            stuffs,
            current_weight + stuffs[i].0,
            current_value + stuffs[i].1,
            max_value,
            i + 1,
            other,
        );
        other.path.pop();
    }
}
struct Scanner<'a> {
    reader: std::io::BufReader<std::io::Stdin>,
    buffer: std::str::SplitAsciiWhitespace<'a>,
    buf: String,
}

impl<'a> Scanner<'a> {
    fn new(reader: std::io::Stdin) -> Self {
        Self {
            reader: std::io::BufReader::new(reader),
            buffer: "".split_ascii_whitespace(),
            buf: String::new(),
        }
    }

    fn scan<T: std::str::FromStr>(&mut self) -> T {
        loop {
            if let Some(s) = self.buffer.next() {
                return s.parse().ok().unwrap();
            } else {
                self.buf.clear();
                std::io::BufRead::read_line(&mut self.reader, &mut self.buf).unwrap();
                self.buffer = unsafe { std::mem::transmute(self.buf.split_ascii_whitespace()) };
            }
        }
    }
}
