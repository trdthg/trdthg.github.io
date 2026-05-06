fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader.lock());
    // let n = sc.scan::<usize>() as u32;
    // let mut arr: Vec<u32> = (0..n).map(|_| sc.scan()).collect();
    let (n, arr) = sc.get_matrix::<u32>();
    println!("{} {:?}", n, arr);
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

    pub fn get_vec<T: std::str::FromStr>(&mut self) -> (usize, Vec<T>) {
        let n = self.scan::<usize>();
        let mut arr: Vec<T> = (0..n).map(|_| self.scan()).collect();
        return (n, arr);
    }

    pub fn get_matrix<T: std::str::FromStr>(&mut self) -> (usize, Vec<Vec<T>>) {
        let n = self.scan::<usize>();
        let mut arr: Vec<Vec<T>> = (0..n)
            .map(|_| (0..n).map(|_| self.scan()).collect())
            .collect();
        return (n, arr);
    }
}
