"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[6076],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>f});var l=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,l,o=function(e,n){if(null==e)return{};var t,l,o={},a=Object.keys(e);for(l=0;l<a.length;l++)t=a[l],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(l=0;l<a.length;l++)t=a[l],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=l.createContext({}),p=function(e){var n=l.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=p(e.components);return l.createElement(i.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return l.createElement(l.Fragment,{},n)}},m=l.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,u=r(e,["components","mdxType","originalType","parentName"]),m=p(t),f=o,h=m["".concat(i,".").concat(f)]||m[f]||d[f]||a;return t?l.createElement(h,s(s({ref:n},u),{},{components:t})):l.createElement(h,s({ref:n},u))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,s=new Array(a);s[0]=m;var r={};for(var i in n)hasOwnProperty.call(n,i)&&(r[i]=n[i]);r.originalType=e,r.mdxType="string"==typeof e?e:o,s[1]=r;for(var p=2;p<a;p++)s[p]=t[p];return l.createElement.apply(null,s)}return l.createElement.apply(null,t)}m.displayName="MDXCreateElement"},8419:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>r,toc:()=>p});var l=t(7462),o=(t(7294),t(3905));const a={},s="Too-Many-Lists",r={unversionedId:"rust/lists",id:"rust/lists",title:"Too-Many-Lists",description:"1. A Bad Stack",source:"@site/docs/rust/lists.md",sourceDirName:"rust",slug:"/rust/lists",permalink:"/docs/rust/lists",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Rust \u8bed\u8a00",permalink:"/docs/rust/"},next:{title:"\u5f02\u6b65\u8fd0\u884c\u65f6",permalink:"/docs/rust/mini_tokio"}},i={},p=[{value:"1. A Bad Stack",id:"1-a-bad-stack",level:2},{value:"\u5f15\u4f8b",id:"\u5f15\u4f8b",level:3},{value:"\u5b8c\u6574\u6848\u4f8b",id:"\u5b8c\u6574\u6848\u4f8b",level:3},{value:"Drop \u7684\u624b\u52a8\u7f16\u5199",id:"drop-\u7684\u624b\u52a8\u7f16\u5199",level:3},{value:"unimplemented!",id:"unimplemented",level:3},{value:"2. An Ok Singly-Linked Stack",id:"2-an-ok-singly-linked-stack",level:2},{value:"\u4f18\u5316\u76ee\u6807",id:"\u4f18\u5316\u76ee\u6807",level:3},{value:"Option &amp; Generic",id:"option--generic",level:3},{value:"Peek",id:"peek",level:3},{value:"IntoIter",id:"intoiter",level:3},{value:"Iter",id:"iter",level:3},{value:"3. A Persistent Stack",id:"3-a-persistent-stack",level:2},{value:"\u5b9e\u73b0\u76ee\u6807",id:"\u5b9e\u73b0\u76ee\u6807",level:3},{value:"Basic",id:"basic",level:3},{value:"Iter",id:"iter-1",level:3},{value:"Drop",id:"drop",level:3},{value:"Test",id:"test",level:3},{value:"4. A Bad Safe Deque",id:"4-a-bad-safe-deque",level:2},{value:"Layout",id:"layout",level:3},{value:"Basic",id:"basic-1",level:3},{value:"Drop",id:"drop-1",level:3},{value:"Iterator",id:"iterator",level:3},{value:"Iter(danger)",id:"iterdanger",level:3},{value:"5. An Unsafe Queue",id:"5-an-unsafe-queue",level:2},{value:"5.1 Safe Rust",id:"51-safe-rust",level:3},{value:"push",id:"push",level:4},{value:"5.2 Unsafe Rust",id:"52-unsafe-rust",level:3},{value:"Layout",id:"layout-1",level:4},{value:"Extras",id:"extras",level:4},{value:"test",id:"test-1",level:4}],u={toc:p};function d(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,l.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"too-many-lists"},"Too-Many-Lists"),(0,o.kt)("h2",{id:"1-a-bad-stack"},"1. A Bad Stack"),(0,o.kt)("h3",{id:"\u5f15\u4f8b"},"\u5f15\u4f8b"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u7528\u8fd9\u79cd\u65b9\u5f0f\u4f1a\u6709\u6807\u7b7e\u5e26\u6765\u7684\u989d\u5916\u5f00\u9500\uff0c\u5c5e\u4e8e\u51fd\u6570\u5f0f\u7f16\u7a0b\u8bed\u8a00\u7684\u9ed8\u8ba4\u65b9\u6cd5"),(0,o.kt)("li",{parentName:"ul"},"\u6240\u4ee5\u7528\u4e0b\u9762\u7684 C-like \u7ed3\u6784\u4f53\u5f62\u5f0f\u5360\u7528\u7a7a\u95f4\u66f4\u5c0f\uff0c"),(0,o.kt)("li",{parentName:"ul"},"\u800c\u4e14\u5355\u4e2a\u8282\u70b9\u80fd\u627f\u8f7d\u66f4\u591a\u5185\u5bb9")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"#[derive(Debug)]\npub enum List<T> {\n    Empty,\n    Elem(T, Box<List<T>>),\n}\n")),(0,o.kt)("h3",{id:"\u5b8c\u6574\u6848\u4f8b"},"\u5b8c\u6574\u6848\u4f8b"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"// 2.1. Layout\npub struct List {\n    head: Link,\n}\nenum Link {\n    Empty,\n    More(Box<Node>),\n}\nstruct Node {\n    elem: i32,\n    next: Link,\n}\nuse std::mem;\nimpl List {\n    // 2.2. New\n    pub fn new() -> Self {\n        List {\n            head: Link::Empty,\n        }\n    }\n    // 2.4. Push\n    pub fn push(&mut self, elem: i32) {\n        let new_node = Box::new(Node {\n            elem,\n            next: mem::replace(&mut self.head, Link::Empty),\n        });\n        self.head = Link::More(new_node)\n    }\n    // 2.5. Pop\n    // \u76f8\u6bd4\u4e8e\u4e0a\u4e00\u4e2a\u66f4\u5e38\u7528\u800c\u4e14\u66f4\u7b80\u6d01\u7684\u5199\u6cd5\n    pub fn pop(&mut self) -> Option<i32> {\n        match mem::replace(&mut self.head, Link::Empty) {\n            Link::Empty => None,\n            Link::More(node) => {\n                self.head = node.next;\n                Some(node.elem)\n            }\n        }\n    }\n}\n\n// 2.6. Testing\n#[cfg(test)]\nmod test {\n    #[test]\n    fn basics() {\n        // TODO\n        use super::-;\n        let mut list = List::new();\n\n        // Check empty list behaves right\n        assert_eq!(list.pop(), None);\n\n        // Populate list\n        list.push(1);\n        list.push(2);\n        list.push(3);\n\n        // Check normal removal\n        assert_eq!(list.pop(), Some(3));\n        assert_eq!(list.pop(), Some(2));\n\n        // Push some more just to make sure nothing's corrupted\n        list.push(4);\n        list.push(5);\n\n        // Check normal removal\n        assert_eq!(list.pop(), Some(5));\n        assert_eq!(list.pop(), Some(4));\n\n        // check exhaustion\n        assert_eq!(list.pop(), Some(1));\n        assert_eq!(list.pop(), None);\n\n        // Check drop\n        list.push(1);\n        list.push(2);\n        list.push(3);\n\n    }\n}\n")),(0,o.kt)("h3",{id:"drop-\u7684\u624b\u52a8\u7f16\u5199"},"Drop \u7684\u624b\u52a8\u7f16\u5199"),(0,o.kt)("p",null,"\u5c1d\u8bd5\u6839\u636e\u5c3e\u9012\u5f52\u5199\u51fa drop \u51fd\u6570\uff0c\u5931\u8d25"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"// 2.7. Drop\nimpl Drop for List {\n    fn drop(&mut self) {\n        self.head.drop();\n    }\n}\nimpl Drop for Link {\n    fn drop(&mut self) {\n        match self {\n            Link::Empty => {},\n            Link::More(ref mut boxed_node) => {\n                boxed_node.drop();\n            }\n        }\n    }\n}\nimpl Drop for Box<Node> {\n    fn drop(&mut self) {\n        self.ptr.drop();   // uh oh, not tail recursive!\n        deallocate(self.ptr);\n    }\n}\nimpl Drop for Node {\n    fn drop(&mut self) {\n        self.next.drop();\n    }\n}\n")),(0,o.kt)("p",null,"::: danger >We can't drop the contents of the Box after deallocating, so there's\nno way to drop in a tail-recursive manner! >Instead we're going to have to\nmanually write an iterative drop for List that hoists nodes out of their boxes.\n::: So, the next is the real way to write drop ourselfs"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},'impl Drop for List {\n    fn drop(&mut self) {\n        println!("\u5f00\u59cb drop");\n        let mut cur_link = mem::replace(&mut self.head, Link::Empty);\n        while let Link::More(mut boxed_node) = cur_link {\n            println!("{}", boxed_node.elem);\n            cur_link = mem::replace(&mut boxed_node.next, Link::Empty);\n        }\n    }\n}\n')),(0,o.kt)("h3",{id:"unimplemented"},"unimplemented!"),(0,o.kt)("p",null,"::: warning"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"// \u8fd4\u56de unimplemented!()\nimpl List {\n    pub fn pop(&mut self) -> Option<i32> {\n        match &self.head {\n            Link::Empty => {\n                // TODO\n            },\n            Link::More(node) => {\n                // TODO\n            }\n        }\n        unimplemented!()\n    }\n}\n")),(0,o.kt)("p",null,":::"),(0,o.kt)("h2",{id:"2-an-ok-singly-linked-stack"},"2. An Ok Singly-Linked Stack"),(0,o.kt)("h3",{id:"\u4f18\u5316\u76ee\u6807"},"\u4f18\u5316\u76ee\u6807"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"3.1: Option \u7b80\u5316\u8bed\u6cd5")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"use Option to replace our own Enum"),(0,o.kt)("li",{parentName:"ul"},"use Option.take() to replace mem::replace(&self, None)"),(0,o.kt)("li",{parentName:"ul"},"use option.take().map(|elem {}|) to replace match option { None => None,\nSome(x) => Some(y) }")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"3.2 Generic \u901a\u7528\u6027")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"just use T to replace i32")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"3.3 Peek(\u5077\u770b) \u5b9e\u73b0 peek")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"}),(0,o.kt)("li",{parentName:"ul"},"\u6ce8\u610f 3 \u8005\u7684\u533a\u522b"),(0,o.kt)("li",{parentName:"ul"},"self.head.take() -> self -> Option(T)"),(0,o.kt)("li",{parentName:"ul"},"self.head.as_ref() -> &self -> Option(&T)"),(0,o.kt)("li",{parentName:"ul"},"self.head.as_mut() -> &mut self -> Option(&mut T)")),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"3.4 - 3.6 \u4e09\u79cd\u8fed\u4ee3\u5668")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"IntoIter - T"),(0,o.kt)("li",{parentName:"ul"},"IterMut - &mut T"),(0,o.kt)("li",{parentName:"ul"},"Iter - &T")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"map(): Maps an Option","<","T",">"," to Option","<","U",">"," by applying a function to a\ncontained value. as_ref()->&self: Converts from &Option","<","T",">"," to\nOption","<","&T",">",". as_mut()->&mut self: Converts from &mut Option","<","T",">"," to\nOption","<","&mut T",">",". take()->&mut self: Takes the value out of the option,\nleaving a ","[None]"," in its place")),(0,o.kt)("h3",{id:"option--generic"},"Option & Generic"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"use std::mem;\n\n#[derive(Debug)]\npub struct List<T> {\n    head: Link<T>,\n}\n\ntype Link<T> = Option<Box<Node<T>>>;\n\n#[derive(Debug)]\nstruct Node<T> {\n    elem: T,\n    next: Link<T>,\n}\n\nimpl<T> List<T> {\n    // 2.2. New\n    pub fn new() -> Self {\n        List { head: None }\n    }\n    // 2.4. Push\n    pub fn push(&mut self, elem: T) {\n        let new_node = Box::new(Node {\n            elem,\n            // next: mem::replace(&mut self.head, None),\n            next: self.head.take(),\n        });\n        self.head = Some(new_node);\n    }\n    // 2.5. Pop\n    pub fn pop(&mut self) -> Option<T> {\n        self.head.take().map(|node| {\n            self.head = node.next;\n            node.elem  //  node.elem not need to be wrapped by Some()\n        })\n    }\n\n}\n")),(0,o.kt)("h3",{id:"peek"},"Peek"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},'impl<T> List<T> {\n    /-\n    impl<T> Option<T> {\n        pub fn as_ref(&self) -> Option<&T>;\n    }\n    -/\n\n    pub fn peek(&self) -> Option<&T> {\n\n        // Converts from &Option<T> to Option<&T>.\n\n        // self             -> &List\n        // self.head        -> &Option< Box<Node<T>>>\n        // self.head.as_ref ->  Option<&Box<Node<T>>>\n        // map(node)        ->         &Box<Node<T>>\n        // node.elem        ->                   T\n        // &node.elem       ->         &         T\n        // map->&node.elem  ->  Option<&         T  >\n        self.head.as_ref().map(|node| {\n            &node.elem\n        })\n    }\n    pub fn peek_mut(&mut self) -> Option<&mut T> {\n        // Converts from &mut Option<T> to Option<&mut T>.\n\n        // self             -> &mut List\n        // self.head        -> &mut Option<     Box<Node<T>>>\n        // self.head.as_mut ->      Option<&mut Box<Node<T>>>\n        // map(node)        ->             &mut Box<Node<T>>\n        // node.elem        ->                           T\n        // &mut node.elem   ->             &mut          T\n        // map->&node.elem  ->      Option<&mut          T  >\n        self.head.as_mut().map(|node| {\n            &mut node.elem\n        })\n    }\n    pub fn peek_(&mut self) -> Option<T> {\n        // warning(not sure): mut_only_in_this_fu_but_only_read_after_read\n        // Takes the value out of the option, leaving a [None] in its place\n\n        // self             -> &mut List\n        // self.head        -> &mut Option<     Box<Node<T>>>\n        // self.head.take   ->      Option<&mut Box<Node<T>>>\n\n        // self.head        -> &mut Option<None>\n        // temp             -> &mut Option<     Box<Node<T>>>\n\n        // map(node)        ->                  Box<Node<T>>\n        // node.elem        ->                           T\n        // map->node.elem   ->      Option<              T  >\n        self.head.take().map(|node| {\n            node.elem\n        })\n    }\n\n}\n\n#[test]\nfn peek() {\n    let mut list = List::new();\n    assert_eq!(list.peek(), None);\n    assert_eq!(list.peek_mut(), None);\n    list.push(1); list.push(2); list.push(3);\n\n    assert_eq!(list.peek(), Some(&3));\n    assert_eq!(list.peek_mut(), Some(&mut 3));\n    // match list.peek_mut() {\n    //     Some(k) => {-k = 30},\n    //     None => {}\n    // }\n    list.peek_mut().map(|val| {\n        -val = 30;\n    });\n    assert_eq!(list.peek_mut(), Some(&mut 30));\n    if let Some(val) = list.peek_mut() {\n        println!("{}", val);\n        -val = 10;\n    }\n    assert_eq!(list.peek_mut(), Some(&mut 10));\n    assert_eq!(list.pop(), Some(10));\n    assert_eq!(list.peek(), Some(&2));\n    if let Some(val) = list.peek_() {\n        println!("{}", val);\n    }\n}\n')),(0,o.kt)("h3",{id:"intoiter"},"IntoIter"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"// 3.4 IntoIter------------------------------------------------------------------------------\n\npub struct IntoIter<T>(List<T>);\n\nimpl<T> List<T> {\n    pub fn into_iter(self) -> IntoIter<T> {\n        IntoIter(self)\n    }\n}\n\nimpl<T> Iterator for IntoIter<T> {\n    type Item = T;\n    fn next(&mut self) -> Option<Self::Item> {\n        self.0.pop()\n    }\n}\n\n#[test]\nfn into_iter_test() {\n    let mut list = List::new();\n    list.push(1);\n    list.push(2);\n    list.push(3);\n    let mut iter = list.into_iter();\n    assert_eq!(iter.next(), Some(3));\n    assert_eq!(iter.next(), Some(2));\n}\n")),(0,o.kt)("h3",{id:"iter"},"Iter"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"// 3.5 Iter------------------------------------------------------------------------------\npub struct Iter<'a, T> {\n    next: Option<&'a Node<T>>\n}\n\nimpl<T> List<T> {\n    // 1. initial\n    // pub fn iter<'a>(&'a self) -> Iter<'a, T> {\n    // 2. apply lifetime elision\n    // pub fn iter(&self) -> Iter<T> {\n    // 3. Or, if you're not comfortable \"hiding\" that a struct contains a lifetime, you can use the Rust 2018 \"explicitly elided lifetime\" syntax, '_:\n    pub fn iter(&self) -> Iter<'_, T> {\n\n        // self             -> &List                    | self                -> &List\n        // self.head        -> &Option< Box<Node<T>>>   | self.head           -> &Option< Box<Node<T>>>\n        // self.head.as_ref ->  Option<&Box<Node<T>>>   | self.head.as_deref  -> &Option<     Node<T> >\n        // map(node)        ->         &Box<Node<T>>    |\n        // -node            ->          Box<Node<T>>    |\n        // --node           ->              Node<T>     |\n        // &--node          ->             &Node<T>     |\n        // map->node        ->  Option<    &Node<T> >   |\n\n        // can be replaced by the next line\n        Iter { next: self.head.as_ref().map(|node| { &--node }) }\n\n        // Iter { next: self.head.as_deref() }\n\n        // node: expected struct `second::Node`, found struct `std::boxed::Box`\n        // -node: expected `&second::Node<T>`, found struct `std::boxed::Box`\n        // --node: expected `&second::Node<T>`, found struct `second::Node`\n    }\n}\n\nimpl<'a, T> Iterator for Iter<'a, T> {\n    type Item = &'a T;\n    fn next(&mut self) -> Option<Self::Item> {\n\n        // self                  -> &mut Iter                           | self                   -> &mut Iter\n        // self.next             -> &mut Option<         &Node<T> >     | self.next              -> &mut Option<         &Node<T>>\n        // map(node)             -> &mut                 &Node<T>       | map(node)              -> &mut                 &Node<T>\n        //     node.next         -> &mut Option<         &Node<T> >     |     node.next          -> &mut Option<     Box< Node<T>>>\n        //     node.next.as_ref  ->      Option<&mut Box< Node<T>>>     |     node.next.as_deref -> &mut Option<          Node<T> >\n        //     map(inner_node)   ->             &mut Box< Node<T>>      |\n        //     -inner_node       ->                  Box< Node<T>>      |\n        //     --inner_node      ->                       Node<T>       |\n        //     &--inner_node     ->                      &Node<T>       |\n        //     map(inner_node)   ->      Option<         &Node<T> >     |\n        // self.next             -> &mut Option<         &Node<T>>      | self.next              -> &mut Option<& Node<T>>\n        // node.elem             -> &mut                       T        |\n        // &node.elem            -> &mut                      &T        |\n        // map->&node.elem       -> &mut Option<              &T >      |\n\n        self.next.map(|node| {\n            self.next = (-node).next.as_ref().map(|node| &--node);\n            // self.next = node.next.as_deref();\n            // self.next = node.next.as_ref().map::<&Node<T>, _>(|node| &node);\n            // node.next = Some(Box::new(Node{elem: 1, next: None}));\n            &node.elem\n        })\n    }\n}\n\n#[test]\nfn iter() {\n    let mut list = List::new();\n    list.push(1); list.push(2); list.push(3);\n\n    let mut iter = list.iter();\n    assert_eq!(iter.next(), Some(&3));\n    assert_eq!(iter.next(), Some(&2));\n    assert_eq!(iter.next(), Some(&1));\n}\n")),(0,o.kt)("h2",{id:"3-a-persistent-stack"},"3. A Persistent Stack"),(0,o.kt)("h3",{id:"\u5b9e\u73b0\u76ee\u6807"},"\u5b9e\u73b0\u76ee\u6807"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"list1 = A -> B -> C -> D\nlist2 = tail(list1) = B -> C -> D\nlist3 = push(list2, X) = X -> B -> C -> D\n\nlist1 -> A ---+\n              |\n              v\nlist2 ------\x3e B -> C -> D\n              ^\n              |\nlist3 -> X ---+\n")),(0,o.kt)("h3",{id:"basic"},"Basic"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"use std::rc::Rc;\n// basic -------------------------------------------------------------------\npub struct List<T> {\n    head: Link<T>\n}\n\ntype Link<T> = Option<Rc<Node<T>>>;\n\nstruct Node<T> {\n    elem: T,\n    next: Link<T>,\n}\n\nimpl<T> List<T> {\n    pub fn new() -> List<T> {\n        List { head: None }\n    }\n    pub fn prepend(&self, elem: T) -> List<T> {\n        List { head: Some(Rc::new(Node { elem, next: self.head.clone() })) }\n    }\n    pub fn tail(&self) -> List<T> {\n        List { head: self.head.as_ref().and_then(|node| node.next.clone()) }\n    }\n    pub fn head(&self) -> Option<&T> {\n        self.head.as_ref().map(|node| &node.elem)\n    }\n}\n")),(0,o.kt)("h3",{id:"iter-1"},"Iter"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"// Iter ------------------------------------------------------------------\npub struct Iter<'a, T> {\n    next: Option<&'a Node<T>>\n}\nimpl<'a, T> Iterator for Iter<'a, T> {\n    type Item = &'a T;\n    fn next(&mut self) -> Option<&'a T> {\n        self.next.map(|node| {\n            self.next = node.next.as_ref().map(|node| &--node);\n            &node.elem\n        })\n    }\n}\nimpl<T> List<T> {\n    pub fn iter(&self) -> Iter<T> {\n        Iter { next: self.head.as_ref().map(|node| &--node) }\n    }\n}\n")),(0,o.kt)("h3",{id:"drop"},"Drop"),(0,o.kt)("p",null,"\u591a\u4e86\u5224\u65ad ref count \u7684\u8fc7\u7a0b"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"// drop ------------------------------------------------------------\nimpl<T> Drop for List<T> {\n    fn drop(&mut self) {\n        let mut head = self.head.take();\n        while let Some(node) = head {\n            if let Ok(mut node) = Rc::try_unwrap(node) {\n                head = node.next.take();\n            } else {\n                break\n            }\n        }\n    }\n}\n")),(0,o.kt)("h3",{id:"test"},"Test"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"#[cfg(Test)]\nmod test {\n    use super::List;\n    #[test]\n    fn basics_test() {\n        let list = List::new();\n        list.prepend(1).prepend(2).prepend(3);\n\n        assert_eq!(list.head(), Some(&3));\n        let list = list.tail();\n        assert_eq!(list.head(), Some(&2));\n        let list = list.tail();\n        assert_eq!(list.head(), Some(&1));\n        let list = list.tail();\n        assert_eq!(list.head(), None);\n        let list = list.tail();\n        assert_eq!(list.head(), None);\n    }\n    #[test]\n    fn iter_test() {\n        let list = List::new().prepend(1).prepend(2).prepend(3);\n\n        let mut iter = list.iter();\n        assert_eq!(iter.next(), Some(&3));\n        assert_eq!(iter.next(), Some(&2));\n        assert_eq!(iter.next(), Some(&1));\n    }\n\n}\n")),(0,o.kt)("h2",{id:"4-a-bad-safe-deque"},"4. A Bad Safe Deque"),(0,o.kt)("p",null,"\u52a0\u5165\u4e86 Rc \u548c RefCell"),(0,o.kt)("h3",{id:"layout"},"Layout"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"se std::rc::Rc;\nuse std::cell::{ Ref, RefMut, RefCell };\n\npub struct List<T> {\n    head: Link<T>,\n    tail: Link<T>,\n}\n\ntype Link<T> = Option<Rc<RefCell<Node<T>>>>;\n\nstruct Node<T> {\n    elem: T,\n    next: Link<T>,\n    prev: Link<T>,\n}\n")),(0,o.kt)("h3",{id:"basic-1"},"Basic"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"impl<T> List<T> {\n    pub fn new() -> List<T> {\n        List { head: None, tail: None }\n    }\n    // 5.2 Building \u4e0b`\n    pub fn push_front(&mut self, elem: T) {\n        let new_head = Node::new(elem);\n        match self.head.take() {\n            Some(old_head) => {\n                old_head.borrow_mut().prev = Some(new_head.clone());\n                new_head.borrow_mut().next = Some(old_head);\n                self.head = Some(new_head);\n            },\n            None => {\n                self.head = Some(new_head.clone());\n                self.tail = Some(new_head);\n            }\n        }\n    }\n    // 5.3 Breaking\n    pub fn pop_front(&mut self) -> Option<T> {\n        self.head.take().map(|old_head| {\n            // \u4e34\u65f6\u501f\u7528 old_head\uff0c\u5e76 take \u4e86 next \u7684 ownership\n            match old_head.borrow_mut().next.take() {\n                Some(new_head) => {\n                    new_head.borrow_mut().prev = None;\n                    self.head = Some(new_head);\n                }\n                None => {\n                    self.tail.take();\n                }\n            }\n            Rc::try_unwrap(old_head).ok().unwrap().into_inner().elem\n        })\n    }\n    // 5.4 Peeking\n    // pub fn peek(&self) -> Option<&T> {\n    //     self.head.as_ref().map(|node| {\n    //         // Rc::try_unwrap(node).ok().unwrap().into_inner().elem\n    //         // &node.borrow().elem\n    //     })\n    // }\n    pub fn peek_front(&self) -> Option<Ref<T>> {\n        self.head.as_ref().map(|node| {\n            Ref::map(node.borrow(), |node| &node.elem)\n        })\n    }\n    pub fn peek_front_mut(&mut self) -> Option<RefMut<T>> {\n        self.head.as_ref().map(|node| {\n            RefMut::map(node.borrow_mut(), |node| &mut node.elem)\n        })\n    }\n    // Back ---------------------------------------------------------\n    pub fn push_back(&mut self, elem: T) {\n        let new_tail = Node::new(elem);\n        match self.tail.take() {\n            Some(old_tail) => {\n                old_tail.borrow_mut().next = Some(new_tail.clone());\n                new_tail.borrow_mut().prev = Some(old_tail.clone());\n                self.tail = Some(new_tail);\n            }\n            None => {\n                self.head = Some(new_tail.clone());\n                self.tail = Some(new_tail);\n            }\n        }\n    }\n    pub fn pop_back(&mut self) -> Option<T> {\n        self.tail.take().map(|old_tail| {\n            match old_tail.borrow_mut().prev.take() {\n                Some(new_tail) => {\n                    new_tail.borrow_mut().next.take();\n                    self.tail = Some(new_tail);\n                }\n                None => {\n                    self.head = None;\n                }\n            }\n            Rc::try_unwrap(old_tail).ok().unwrap().into_inner().elem\n        })\n    }\n    pub fn peek_back(&self) -> Option<Ref<T>> {\n        self.tail.as_ref().map(|node| {\n            Ref::map(node.borrow(), |node| &node.elem)\n        })\n    }\n    pub fn peek_back_mut(&mut self) -> Option<RefMut<T>> {\n        self.tail.as_ref().map(|node| {\n            RefMut::map(node.borrow_mut(), |node| &mut node.elem)\n        })\n    }\n}\n\nimpl<T> Node<T> {\n    pub fn new(elem: T) -> Rc<RefCell<Node<T>>> {\n        Rc::new(RefCell::new(Node {\n            elem,\n            next:None,\n            prev: None,\n        }))\n    }\n}\n")),(0,o.kt)("h3",{id:"drop-1"},"Drop"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"impl<T> Drop for List<T> {\n    fn drop(&mut self) {\n        while self.pop_front().is_some() {}\n    }\n}\n")),(0,o.kt)("h3",{id:"iterator"},"Iterator"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"// \u53e6\u4e00\u4e2a\u65b9\u5411\u76f4\u63a5\u5b9e\u73b0 DoubleEndedIterator Trait \u5c31\u884c\n// IntoIter\npub struct IntoIter<T>(List<T>);\n\nimpl<T> List<T> {\n    pub fn into_iter(self) -> IntoIter<T> {\n        IntoIter(self)\n    }\n}\n\n// natural\nimpl<T> Iterator for IntoIter<T> {\n    type Item = T;\n    fn next(&mut self) -> Option<T> {\n        self.0.pop_front()\n    }\n}\n// reverse\nimpl<T> DoubleEndedIterator for IntoIter<T> {\n    fn next_back(&mut self) -> Option<T> {\n        self.0.pop_back()\n    }\n}\n")),(0,o.kt)("h3",{id:"iterdanger"},"Iter(danger)"),(0,o.kt)("admonition",{type:"warning"},(0,o.kt)("p",{parentName:"admonition"},"\u65e0\u6cd5\u5b9e\u73b0\u800c\u4e14\u6839\u672c\u770b\u4e0d\u61c2\uff0c\u4e00\u5934\u96fe\u6c34")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"// Iter\npub struct Iter<'a, T>(Option<Ref<'a, Node<T>>>);\n\nimpl<T> List<T> {\n    pub fn iter(&self) -> Iter<T> {\n        Iter(self.head.as_ref().map(|head| {head.borrow()}))\n        // \u82e5\u4e3a Ref<T>\n        // Iter(self.head.as_ref().map(|head| {Ref::map(head.borrow(), |head| &head.elem)}))\n    }\n}\n\nimpl<'a, T> Iterator for Iter<'a, T> {\n    type Item = Ref<'a, T>;\n    fn next(&mut self) -> Option<Ref<'a, T>> {\n        self.0.take().map(|node_ref| {\n            // self.0 = node_ref.next.as_ref().map(|head| {head.borrow()});\n            // // node_ref \u5728\u95ed\u5305\u5185\u88ab\u501f\u7528\n            // Ref::map(node_ref, |node| &node.elem)\n            // // node_ref \u5728\u95ed\u5305\u5916\u518d\u6b21\u88ab\u501f\u7528\n            let (next, elem) = Ref::map_split(node_ref, |node| {\n                (&node.next, &node.elem)\n            });\n            self.0 = next.as_ref().map(|head| head.borrow());\n            elem\n        })\n    }\n}\n")),(0,o.kt)("h2",{id:"5-an-unsafe-queue"},"5. An Unsafe Queue"),(0,o.kt)("h3",{id:"51-safe-rust"},"5.1 Safe Rust"),(0,o.kt)("p",null,"Well, pushing is actually fine."),(0,o.kt)("h4",{id:"push"},"push"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"// An Unsafe Queue\n\n/-\ninput list:\n[Some(ptr)] -> (A, Some(ptr)) -> (B, None)\n\nflipped push X:\n[Some(ptr)] -> (A, Some(ptr)) -> (B, Some(ptr)) -> (X, None)\n\n-/\n\n// Layout\npub struct List<'a, T> {\n    head: Link<T>,\n    tail: Option<&'a mut Node<T>>,\n}\n\ntype Link<T> = Option<Box<Node<T>>>;\n\nstruct Node<T> {\n    elem: T,\n    next: Link<T>,\n}\n\n// Basic\nimpl<'a, T> List<'a, T> {\n    pub fn new() -> List<'a, T> {\n        List { head: None, tail: None }\n    }\n\n    pub fn push(&'a mut self, elem: T) {\n        let new_tail = Box::new(Node {\n            elem: elem,\n            // When you push onto the tail, your next is always None\n            next: None,\n        });\n\n        // Put the box in the right place, and then grab a reference to its Node\n        match self.tail.take() {\n            Some(old_tail) => {\n                // If the old tail existed, update it to point to the new tail\n                old_tail.next = Some(new_tail);\n                self.tail = old_tail.next.as_deref_mut()\n            }\n            None => {\n                // Otherwise, update the head to point to it\n                self.head = Some(new_tail);\n                self.tail = self.head.as_deref_mut()\n            }\n        };\n    }\n}\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"However pop is another story. If they're popping elements outside of our\nrange, it should still be fine. We can't see those nodes so nothing will\nhappen. However if they try to pop off the node we're pointing at..."),(0,o.kt)("blockquote",{parentName:"blockquote"},(0,o.kt)("p",{parentName:"blockquote"},"everything will blow up! In particular when they go to unwrap the result of\nthe try_unwrap, it will actually fail, and the whole program will panic."))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn pop(&mut self) -> Option<T> {\n    self.head.take().map(|head| {\n        let head = -head;\n        self.head = head.next;\n        if self.head.is_none() {\n            self.tail = None;\n        }\n        head.elem\n    })\n}\n")),(0,o.kt)("h3",{id:"52-unsafe-rust"},"5.2 Unsafe Rust"),(0,o.kt)("h4",{id:"layout-1"},"Layout"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rus"},"// Layout\npub struct List<T> {\n    head: Link<T>,\n    tail: -mut Node<T>,\n}\n\ntype Link<T> = Option<Box<Node<T>>>;\n\nstruct Node<T> {\n    elem: T,\n    next: Link<T>,\n}\n\nuse std::ptr;\nimpl<T> List<T> {\n    pub fn new() -> Self {\n        List { head: None, tail:  ptr::null_mut()}\n    }\n    pub fn push(&mut self, elem: T) {\n        let mut new_tail = Box::new(Node {\n            elem,\n            next: None,\n        });\n\n        let raw_tail: -mut _ = &mut -new_tail;\n        if !self.tail.is_null() {\n            unsafe {\n                (-self.tail).next = Some(new_tail);\n            }\n        } else {\n            self.head = Some(new_tail);\n        }\n        self.tail = raw_tail;\n    }\n    pub fn pop(&mut self) -> Option<T> {\n        self.head.take().map(|head| {\n            let head = -head;\n            self.head = head.next;\n            if self.head.is_none() {\n                self.tail = ptr::null_mut()\n            };\n            head.elem\n        })\n    }\n}\n")),(0,o.kt)("h4",{id:"extras"},"Extras"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct IntoIter<T>(List<T>);\n\npub struct Iter<'a, T> {\n    next: Option<&'a Node<T>>\n}\n\npub struct IterMut<'a, T> {\n    next: Option<&'a mut Node<T>>\n}\n\nimpl<T> List<T> {\n    pub fn peek(&self) -> Option<&T> {\n        self.head.as_ref().map(|node| {\n            &node.elem\n        })\n    }\n    pub fn peek_mut(&mut self) -> Option<&mut T> {\n        self.head.as_mut().map(|node| {\n            &mut node.elem\n        })\n    }\n    pub fn into_iter(self) -> IntoIter<T> {\n        IntoIter(self)\n    }\n    pub fn iter(&self) -> Iter<T> {\n        Iter { next: self.head.as_deref() }\n    }\n    pub fn iter_mut(&mut self) -> IterMut<T> {\n        IterMut { next: self.head.as_deref_mut() }\n    }\n}\n\nimpl<T> Iterator for IntoIter<T> {\n    type Item = T;\n    fn next(&mut self) -> Option<Self::Item> {\n        self.0.pop()\n    }\n}\nimpl<'a, T> Iterator for Iter<'a, T> {\n    type Item = &'a T;\n    fn next(&mut self) -> Option<Self::Item> {\n        self.next.map(|node| {\n            self.next = node.next.as_deref();\n            &node.elem\n        })\n    }\n}\nimpl<'a, T> Iterator for IterMut<'a, T> {\n    type Item = &'a mut T;\n    fn next(&mut self) -> Option<Self::Item> {\n        self.next.take().map(|node| {\n            self.next = node.next.as_deref_mut();\n            &mut node.elem\n        })\n    }\n}\n")),(0,o.kt)("h4",{id:"test-1"},"test"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"mod test {\n    use super::List;\n    #[test]\n    fn basics() {\n        let mut list = List::new();\n\n        // Check empty list behaves right\n        assert_eq!(list.pop(), None);\n\n        // Populate list\n        list.push(1);\n        list.push(2);\n        list.push(3);\n\n        // Check normal removal\n        assert_eq!(list.pop(), Some(1));\n        assert_eq!(list.pop(), Some(2));\n\n        // Push some more just to make sure nothing's corrupted\n        list.push(4);\n        list.push(5);\n\n        // Check normal removal\n        assert_eq!(list.pop(), Some(3));\n        assert_eq!(list.pop(), Some(4));\n\n        // Check exhaustion\n        assert_eq!(list.pop(), Some(5));\n        assert_eq!(list.pop(), None);\n    }\n    #[test]\n    fn into_iter() {\n        let mut list = List::new();\n        list.push(1); list.push(2); list.push(3);\n\n        let mut iter = list.into_iter();\n        assert_eq!(iter.next(), Some(1));\n        assert_eq!(iter.next(), Some(2));\n        assert_eq!(iter.next(), Some(3));\n        assert_eq!(iter.next(), None);\n    }\n\n    #[test]\n    fn iter() {\n        let mut list = List::new();\n        list.push(1); list.push(2); list.push(3);\n\n        let mut iter = list.iter();\n        assert_eq!(iter.next(), Some(&1));\n        assert_eq!(iter.next(), Some(&2));\n        assert_eq!(iter.next(), Some(&3));\n        assert_eq!(iter.next(), None);\n    }\n\n    #[test]\n    fn iter_mut() {\n        let mut list = List::new();\n        list.push(1); list.push(2); list.push(3);\n\n        let mut iter = list.iter_mut();\n        assert_eq!(iter.next(), Some(&mut 1));\n        assert_eq!(iter.next(), Some(&mut 2));\n        assert_eq!(iter.next(), Some(&mut 3));\n        assert_eq!(iter.next(), None);\n    }\n}\n")))}d.isMDXComponent=!0}}]);