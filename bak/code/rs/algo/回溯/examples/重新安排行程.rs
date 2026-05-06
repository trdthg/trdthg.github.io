use std::{
    cell::RefCell,
    collections::{BTreeMap, HashMap},
};

// 3
// JFK KUL
// JFK NRT
// NRT JFK
// [["JFK", "NRT", "JFK", "KUL"]]
fn main() {
    let reader = std::io::stdin();
    let mut sc = Scanner::new(reader);
    let s = sc.scan::<usize>();
    let nums = (0..s)
        .map(|_| (sc.scan(), sc.scan()))
        .collect::<Vec<(String, String)>>();
    let res = solve(&nums);
    println!("{:?}", res);
}

fn solve(pairs: &Vec<(String, String)>) -> Vec<Vec<String>> {
    let mut res = vec![];
    let mut path: Vec<String> = vec![];
    let mut map: HashMap<String, BTreeMap<String, RefCell<usize>>> = HashMap::new();
    for pair in pairs {
        let btree = map
            .entry(pair.0.to_owned())
            .or_insert(BTreeMap::from([(pair.1.to_owned(), RefCell::new(1))]));
        btree.entry(pair.1.to_owned()).or_insert(RefCell::new(1));
    }
    path.push("JFK".to_owned());
    backtracing(pairs, &mut map, &mut res, &mut path);
    res
}

// 1. 函数的参数和返回值
fn backtracing(
    pairs: &Vec<(String, String)>,
    map: &HashMap<String, BTreeMap<String, RefCell<usize>>>,
    res: &mut Vec<Vec<String>>,
    path: &mut Vec<String>,
) -> bool {
    // 成功了
    if path.len() == pairs.len() + 1 {
        // println!("找到了：{}", path.last().unwrap());
        res.push(path.clone());
        return true;
    }
    // println!("{:?}", &path);
    let btree = map.get(path.last().expect("没有了"));
    if btree.is_none() {
        // println!("不能继续飞：{}", path.last().unwrap());
        return false;
    }
    let btree = btree.unwrap();
    // println!("-- key: {}", path.last().unwrap());
    for (target, cnt) in btree.iter() {
        // 不能再飞了，跳过
        if cnt.borrow().eq(&0) {
            continue;
        }
        // 飞
        path.push(target.to_owned());
        // println!("{:?}", &path);
        *cnt.borrow_mut() -= 1;
        // 如果不能继续了
        if backtracing(pairs, map, res, path) {
            return true;
            // continue;
        }
        *cnt.borrow_mut() += 1;
        path.pop();
    }
    // println!("没有飞到，但是已经结束了");
    return false;
}

#[cfg(test)]
mod test {
    use super::solve;

    #[test]
    fn it_dhould_return_ok() {
        assert_eq!(2 * 2, 4);
    }
    #[test]
    fn it_should_return_err() {}
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
