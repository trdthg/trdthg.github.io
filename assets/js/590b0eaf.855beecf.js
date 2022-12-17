"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[498],{3905:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>k});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=r.createContext({}),c=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):p(p({},n),e)),t},s=function(e){var n=c(e.components);return r.createElement(u.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},i=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),i=c(t),k=o,d=i["".concat(u,".").concat(k)]||i[k]||m[k]||a;return t?r.createElement(d,p(p({ref:n},s),{},{components:t})):r.createElement(d,p({ref:n},s))}));function k(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,p=new Array(a);p[0]=i;var l={};for(var u in n)hasOwnProperty.call(n,u)&&(l[u]=n[u]);l.originalType=e,l.mdxType="string"==typeof e?e:o,p[1]=l;for(var c=2;c<a;c++)p[c]=t[c];return r.createElement.apply(null,p)}return r.createElement.apply(null,t)}i.displayName="MDXCreateElement"},5370:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>p,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var r=t(7462),o=(t(7294),t(3905));const a={},p=void 0,l={permalink:"/blog/2022/04/03/[\u8bd1] Rust \u516d\u8fb9\u5f62\u67b6\u6784/Rust \u516d\u8fb9\u5f62\u67b6\u6784 6 CLI",source:"@site/blog/2022-04-03-[\u8bd1] Rust \u516d\u8fb9\u5f62\u67b6\u6784/Rust \u516d\u8fb9\u5f62\u67b6\u6784 6 CLI.md",title:"[\u8bd1] Rust \u516d\u8fb9\u5f62\u67b6\u6784/Rust \u516d\u8fb9\u5f62\u67b6\u6784 6 CLI",description:"\u539f\u6587\u94fe\u63a5\uff1ahttps://alexis-lozano.com/hexagonal-architecture-in-rust-6/",date:"2022-04-03T00:00:00.000Z",formattedDate:"2022\u5e744\u67083\u65e5",tags:[],readingTime:9.68,hasTruncateMarker:!1,authors:[],frontMatter:{},prevItem:{title:"[\u8bd1] Rust \u516d\u8fb9\u5f62\u67b6\u6784/Rust \u516d\u8fb9\u5f62\u67b6\u6784 5 \u5176\u4ed6\u7528\u4f8b",permalink:"/blog/2022/04/03/[\u8bd1] Rust \u516d\u8fb9\u5f62\u67b6\u6784/Rust \u516d\u8fb9\u5f62\u67b6\u6784 5 \u5176\u4ed6\u7528\u4f8b"},nextItem:{title:"[\u8bd1] Rust \u516d\u8fb9\u5f62\u67b6\u6784/Rust \u516d\u8fb9\u5f62\u67b6\u6784 7 \u957f\u671f\u5b58\u50a8\u5e93",permalink:"/blog/2022/04/03/[\u8bd1] Rust \u516d\u8fb9\u5f62\u67b6\u6784/Rust \u516d\u8fb9\u5f62\u67b6\u6784 7 \u957f\u671f\u5b58\u50a8\u5e93"}},u={authorsImageUrls:[]},c=[{value:"\u642d\u5efa\u811a\u624b\u67b6",id:"\u642d\u5efa\u811a\u624b\u67b6",level:2},{value:"\u521b\u5efa\u4e00\u4e2a\u5b9d\u53ef\u68a6",id:"\u521b\u5efa\u4e00\u4e2a\u5b9d\u53ef\u68a6",level:2},{value:"\u83b7\u53d6\u6240\u6709\u5b9d\u53ef\u68a6",id:"\u83b7\u53d6\u6240\u6709\u5b9d\u53ef\u68a6",level:2},{value:"\u67e5\u8be2\u4e00\u4e2a\u5b9d\u53ef\u68a6",id:"\u67e5\u8be2\u4e00\u4e2a\u5b9d\u53ef\u68a6",level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2}],s={toc:c};function m(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,r.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u539f\u6587\u94fe\u63a5\uff1a",(0,o.kt)("a",{parentName:"p",href:"https://alexis-lozano.com/hexagonal-architecture-in-rust-6/"},"https://alexis-lozano.com/hexagonal-architecture-in-rust-6/")),(0,o.kt)("p",{parentName:"blockquote"},"\u7ffb\u8bd1\uff1a",(0,o.kt)("a",{parentName:"p",href:"https://github.com/trdthg"},"trdthg")),(0,o.kt)("p",{parentName:"blockquote"},"\u9009\u9898\uff1a",(0,o.kt)("a",{parentName:"p",href:"https://github.com/trdthg"},"trdthg")),(0,o.kt)("p",{parentName:"blockquote"},"\u672c\u6587\u7531 ",(0,o.kt)("a",{parentName:"p",href:"https://Rustt.org"},"Rustt")," \u7ffb\u8bd1\uff0c",(0,o.kt)("a",{parentName:"p",href:"https://studyrust.org"},"StudyRust")," \u8363\u8a89\u63a8\u51fa")),(0,o.kt)("h1",{id:"2021-10-09---rust-\u516d\u8fb9\u5f62\u67b6\u6784-6---cli"},"2021-10-09 - Rust \u516d\u8fb9\u5f62\u67b6\u6784 #6 - CLI"),(0,o.kt)("p",null,"\u563f\uff0c\u597d\u4e45\u4e0d\u89c1\uff01\u4e0a\u6b21\uff0c\u6211\u4eec\u5b9e\u73b0\u4e86\u5269\u4f59\u7684\u7528\u4f8b\uff0c\u5e76\u5c06\u5b83\u4eec\u8fde\u63a5\u5230\u6211\u4eec\u7684 API\u3002\u73b0\u5728\uff0c\u6211\u60f3\u6dfb\u52a0\u53e6\u4e00\u79cd\u65b9\u5f0f\u6765\u4f7f\u7528\u6211\u4eec\u7684\u7a0b\u5e8f\u3002\u6211\u4eec\u5c06\u4f7f\u7528 CLI\u3002CLI \u662f\nCommand Line Interface (\u547d\u4ee4\u884c\u63a5\u53e3) \u7684\u610f\u601d\uff0c\u5b83\u53ea\u662f\u4e00\u4e2a\u7f29\u5199\u8bcd\uff0c\u610f\u601d\u662f\uff1a\u201c\u8ba9\u6211\u4eec\u901a\u8fc7\u7ec8\u7aef\u4f7f\u7528\u8fd9\u4e2a\u7a0b\u5e8f\u201d\u3002"),(0,o.kt)("h2",{id:"\u642d\u5efa\u811a\u624b\u67b6"},"\u642d\u5efa\u811a\u624b\u67b6"),(0,o.kt)("p",null,"\u6784\u5efa CLI \u610f\u5473\u7740\u6211\u4eec\u9700\u8981\u5728\u9879\u76ee\u4e2d\u6dfb\u52a0\u65b0\u7684\u4f9d\u8d56\u548c\u4e00\u4e2a\u65b0\u6587\u4ef6\u5939\u3002\u8ba9\u6211\u4eec\u4ece\u6dfb\u52a0\u4f9d\u8d56\u5f00\u59cb\u3002\u6211\u4eec\u9700\u8981\u4e00\u79cd\u65b9\u6cd5\uff0c\u518d\u8fd0\u884c\u4e4b\u524d\u9700\u8981\u63d0\u793a\u7528\u6237\u662f\u8fd0\u884c CLI \u8fd8\u662f HTTP\nAPI\u3002\u6211\u4eec\u5c06\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"clap")," \u6dfb\u52a0\u547d\u4ee4\u884c\u5f00\u5173\u8ba9\u7528\u6237\u9009\u62e9\u542f\u52a8\u65b9\u5f0f\uff0c\u540c\u65f6\u8fd8\u4f1a\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"dialoguer")," \u53bb\u521b\u5efa\u63d0\u793a\u4fe1\u606f\u3002"),(0,o.kt)("p",null,"\u6253\u5f00 Cargo.toml\uff0c\u5e76\u6dfb\u52a0\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-toml"},'[dependencies]\n...\nclap = "2.33.3"\ndialoguer = "0.8.0"\n')),(0,o.kt)("p",null,"\u5f53\u4f60\u518d\u8bfb\u8fd9\u7bc7\u6587\u7ae0\u65f6\u53ef\u4ee5\u5c06\u4f9d\u8d56\u6362\u4e3a\u6700\u65b0\u7684\u3002\u73b0\u5728\u8ba9\u6211\u4eec\u6dfb\u52a0\u4e00\u4e9b\u547d\u4ee4\u884c\u5f00\u5173\uff0c\u6253\u5f00 ",(0,o.kt)("em",{parentName:"p"},"main.rs"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},'#[macro_use]\nextern crate clap;\n\nuse clap::{App, Arg};\nAnd then we can use it:\n\nfn main() {\n    let repo = Arc::new(InMemoryRepository::new());\n\n    let matches = App::new(crate_name!())\n        .version(crate_version!())\n        .author(crate_authors!())\n        .arg(Arg::with_name("cli").long("cli").help("Runs in CLI mode"))\n        .get_matches();\n\n    match matches.occurrences_of("cli") {\n        0 => api::serve("localhost:8000", repo),\n        _ => unreachable!(),\n    }\n}\n')),(0,o.kt)("p",null,"\u6240\u4ee5\uff0c\u9996\u5148\u6211\u4eec\u521b\u5efa\u4e86\u5b58\u50a8\u5e93\u3002\u7136\u540e\u6211\u4eec\u521b\u5efa\u4e00\u4e2a\u5904\u7406 CLI \u7684 clap \u5e94\u7528\u7a0b\u5e8f\u3002\u5982\u679c\u5728\u8fd0\u884c\u7a0b\u5e8f\u65f6\u6dfb\u52a0 ",(0,o.kt)("inlineCode",{parentName:"p"},"--cli")," \u6807\u5fd7\uff0c\u7a0b\u5e8f\u73b0\u5728\u5c06\npanic\u3002\u5982\u679c\u6ca1\u6709\u6dfb\u52a0\uff0c\u5c31\u4f1a\u8fd0\u884c API\u3002\u6b63\u5982\u6211\u4e4b\u524d\u6240\u8bf4\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"clap")," \u80fd\u8ba9\u6211\u4eec\u5feb\u901f\u521b\u5efa\u4e00\u4e2a CLI\u3002\u60a8\u53ef\u4ee5\u901a\u8fc7\u8fd0\u884c\u6765\u5c1d\u8bd5\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},"cargo run -- --help\n\npokedex 0.1.0\nAlexis Lozano <alexis.pascal.lozano@gmail.com>\n\nUSAGE:\n    pokedex [FLAGS]\n\nFLAGS:\n        --cli        Runs in CLI mode\n    -h, --help       Prints help information\n    -V, --version    Prints version information\n")),(0,o.kt)("p",null,"\u975e\u5e38\u4e0d\u9519\u662f\u5427 :)"),(0,o.kt)("p",null,"\u73b0\u5728\u6211\u4eec\u8981\u628a ",(0,o.kt)("inlineCode",{parentName:"p"},"unreachable!()")," \u66ff\u6362\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"cli::run(repo)"),"\u3002\u6211\u4eec\u73b0\u5728\u8981\u521b\u5efa\u4e00\u4e2a ",(0,o.kt)("inlineCode",{parentName:"p"},"cli")," \u6a21\u5757\uff0c\u6240\u6709\u548c cli\n\u76f8\u5173\u7684\u4ee3\u7801\u90fd\u4f1a\u5728\u8be5\u6a21\u5757\u91cc\u3002\u5728 ",(0,o.kt)("em",{parentName:"p"},"main.rs")," \u91cc\u5f15\u5165\u6a21\u5757\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},"mod cli;\n")),(0,o.kt)("p",null,"\u63a5\u7740\u8ba9\u6211\u4eec\u521b\u5efa ",(0,o.kt)("em",{parentName:"p"},"src/cli")," \u6587\u4ef6\u5939\uff0c\u5e76\u5728\u5176\u4e2d\u6dfb\u52a0\u4e00\u4e2a ",(0,o.kt)("em",{parentName:"p"},"mod.rs")," \u6587\u4ef6\u3002\u5728 ",(0,o.kt)("em",{parentName:"p"},"cli/mod.rs")," \u4e2d\u6dfb\u52a0\u4ee5\u4e0b\u4ee3\u7801\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},"use crate::repositories::pokemon::Repository;\nuse std::sync::Arc;\n\npub fn run(repo: Arc<dyn Repository>) {}\n")),(0,o.kt)("p",null,"\u73b0\u5728\u8fd0\u884c ",(0,o.kt)("inlineCode",{parentName:"p"},"cargo run -- --cli")," \u5e94\u8be5\u4e0d\u4f1a panic \u4e86\u3002"),(0,o.kt)("p",null,"\u63a5\u7740\u8ba9\u6211\u4eec\u521b\u5efa\u4e00\u4e2a\u5faa\u73af\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},'use dialoguer::{theme::ColorfulTheme, Select};\n\npub fn run(repo: Arc<dyn Repository>) {\n    loop {\n        let choices = [\n            "Fetch all Pokemons",\n            "Fetch a Pokemon",\n            "Create a Pokemon",\n            "Delete a Pokemon",\n            "Exit",\n        ];\n        let index = match Select::with_theme(&ColorfulTheme::default())\n            .with_prompt("Make your choice")\n            .items(&choices)\n            .default(0)\n            .interact()\n        {\n            Ok(index) => index,\n            _ => continue,\n        };\n\n        match index {\n            4 => break,\n            _ => continue,\n        };\n    }\n}\n')),(0,o.kt)("p",null,"\u6211\u4eec\u5217\u51fa\u4e86\u6240\u6709\u7528\u6237\u80fd\u591f\u8fd0\u884c\u7684\u547d\u4ee4\u3002\u5982\u679c\u7528\u6237\u9009\u62e9 ",(0,o.kt)("inlineCode",{parentName:"p"},"Exit"),"\uff0c\u7a0b\u5e8f\u5c31\u4f1a\u9000\u51fa\u3002\u5426\u5219\uff0c\u7a0b\u5e8f\u6682\u65f6\u4ec0\u4e48\u90fd\u4e0d\u4f1a\u505a\u3002\u522b\u62c5\u5fc3\uff0c\u6211\u4eec\u9a6c\u4e0a\u5c31\u4f1a\u5b9e\u73b0\u5176\u4ed6\u7684\u547d\u4ee4\u3002"),(0,o.kt)("h2",{id:"\u521b\u5efa\u4e00\u4e2a\u5b9d\u53ef\u68a6"},"\u521b\u5efa\u4e00\u4e2a\u5b9d\u53ef\u68a6"),(0,o.kt)("p",null,"\u8ba9\u6211\u4eec\u4ece\u521b\u5efa\u5f00\u59cb\u3002\u5982\u679c\u6211\u4eec\u80fd\u591f\u6709\u65b9\u6cd5\u5411\u5b58\u50a8\u5e93\u4e2d\u6dfb\u52a0\u5b9d\u53ef\u68a6\uff0c\u540e\u9762\u7684\u6d4b\u8bd5\u5c31\u66f4\u5bb9\u6613\u505a\u4e86\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},"match index {\n    2 => create_pokemon::run(repo.clone()),\n    ...\n};\n")),(0,o.kt)("p",null,"\u73b0\u5728\u6211\u4eec\u9700\u8981\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u6a21\u5757\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},"mod create_pokemon;\n")),(0,o.kt)("p",null,"\u597d\u4e86\uff0c\u5728 ",(0,o.kt)("em",{parentName:"p"},"cli/create_pokemon.rs")," \u4e2d\u586b\u52a0\u4e0a\u5bf9\u5e94\u7684\u51fd\u6570\u7b7e\u540d\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},"use crate::repositories::pokemon::Repository;\nuse std::sync::Arc;\n\npub fn run(repo: Arc<dyn Repository>) {}\n")),(0,o.kt)("p",null,"\u4e3a\u4e86\u521b\u5efa\u4e00\u4e2a\u5b9d\u53ef\u68a6\uff0cCLI \u9700\u8981\u5411\u7528\u6237\u8be2\u95ee\u5b9d\u53ef\u68a6\u7684 \u7f16\u53f7\u3001\u540d\u79f0\u548c\u7c7b\u578b\u3002\u4e3a\u4e86\u65b9\u4fbf\u8fd9\u4e2a\u8fc7\u7a0b\uff0c\u5e76\u4e14\u63d0\u9ad8\u63d0\u793a\u4fe1\u606f\u7684\u590d\u7528\u6027\uff0c\u6211\u4eec\u4f1a\u4e3a\u8fd9\u4e9b\u4fe1\u606f\u5206\u522b\u5b9e\u73b0\u5404\u81ea\u7684\u63d0\u793a\u51fd\u6570\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},"use crate::cli::{prompt_name, prompt_number, prompt_types};\n\npub fn run(repo: Arc<dyn Repository>) {\n    let number = prompt_number();\n    let name = prompt_name();\n    let types = prompt_types();\n}\n")),(0,o.kt)("p",null,"\u63a5\u7740\u5728 ",(0,o.kt)("em",{parentName:"p"},"cli/mod.rs")," \u4e2d\u5b9e\u73b0\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},'use dialoguer::{..., Input, MultiSelect};\n\npub fn prompt_number() -> Result<u16, ()> {\n    match Input::new().with_prompt("Pokemon number").interact_text() {\n        Ok(number) => Ok(number),\n        _ => Err(()),\n    }\n}\n\npub fn prompt_name() -> Result<String, ()> {\n    match Input::new().with_prompt("Pokemon name").interact_text() {\n        Ok(name) => Ok(name),\n        _ => Err(()),\n    }\n}\n\npub fn prompt_types() -> Result<Vec<String>, ()> {\n    let types = ["Electric", "Fire"];\n    match MultiSelect::new()\n        .with_prompt("Pokemon types")\n        .items(&types)\n        .interact()\n    {\n        Ok(indexes) => Ok(indexes\n            .into_iter()\n            .map(|index| String::from(types[index]))\n            .collect::<Vec<String>>()),\n        _ => Err(()),\n    }\n}\n')),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u63d0\u793a\uff1a\u591a\u9009\u6846\u6309\u7a7a\u683c\u9009\u4e2d")),(0,o.kt)("p",null,"\u5982\u4f60\u6240\u89c1\uff0c\u6240\u6709\u7684\u63d0\u793a\u90fd\u53ef\u80fd\u5931\u8d25\uff0c\u8ba9\u6211\u4eec\u56de\u5230 ",(0,o.kt)("em",{parentName:"p"},"cli/create","_","pokemon.rs"),"\uff0c\u6709\u4e86\u7528\u6237\u7684\u8f93\u5165\u4fe1\u606f\uff0c\u6211\u4eec\u53ef\u4ee5\u5c06\u5b83\u5c01\u88c5\u4e3a\u7528\u4f8b\u4e2d\u9700\u8981\u7684\n",(0,o.kt)("inlineCode",{parentName:"p"},"Request")," \u7ed3\u6784\u4f53\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},'use crate::domain::create_pokemon;\n\npub fn run(repo: Arc<dyn Repository>) {\n    ...\n    let req = match (number, name, types) {\n        (Ok(number), Ok(name), Ok(types)) => create_pokemon::Request {\n            number,\n            name,\n            types,\n        },\n        _ => {\n            println!("An error occurred during the prompt");\n            return;\n        }\n    };\n')),(0,o.kt)("p",null,"\u5f53\u53d1\u751f\u8f93\u5165\u9519\u8bef\u65f6\uff0c\u6211\u4eec\u4f1a\u9000\u56de\u5230\u4e3b\u83dc\u5355\u3002\u73b0\u5728\u6709\u4e86 ",(0,o.kt)("inlineCode",{parentName:"p"},"Request")," \u7ed3\u6784\u4f53\uff0c\u6211\u4eec\u5c31\u80fd\u8c03\u7528\u521b\u5efa\u5b9d\u53ef\u68a6\u7684\u7528\u4f8b\u4e86\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},'pub fn run(repo: Arc<dyn Repository>) {\n    ...\n    match create_pokemon::execute(repo, req) {\n        Ok(res) => {},\n        Err(create_pokemon::Error::BadRequest) => println!("The request is invalid"),\n        Err(create_pokemon::Error::Conflict) => println!("The Pokemon already exists"),\n        Err(create_pokemon::Error::Unknown) => println!("An unknown error occurred"),\n    };\n}\n')),(0,o.kt)("p",null,"\u6211\u4eec\u5904\u7406\u4e86\u6240\u6709\u7684\u9519\u8bef\u7c7b\u578b\uff0c\u6bcf\u79cd\u9519\u8bef\u90fd\u4f1a\u53cd\u9988\u5230\u7528\u6237\u7684\u7ec8\u7aef\u4e0a\u3002\u5f53\u7528\u4f8b\u6267\u884c\u6210\u529f\u65f6\uff0c\u6211\u4eec\u4f1a\u8fd4\u56de\u4e00\u4e2a ",(0,o.kt)("inlineCode",{parentName:"p"},"Response"),"\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},'#[derive(Debug)]\nstruct Response {\n    number: u16,\n    name: String,\n    types: Vec<String>,\n}\n\npub fn run(repo: Arc<dyn Repository>) {\n    ...\n    match create_pokemon::execute(repo, req) {\n        Ok(res) => println!(\n            "{:?}",\n            Response {\n                number: res.number,\n                name: res.name,\n                types: res.types,\n            }\n        ),\n        ...\n    };\n}\n')),(0,o.kt)("p",null,"\u597d\u4e86\uff0c\u8ba9\u6211\u4eec\u6d4b\u8bd5\u4e00\u4e0b\uff01\u6253\u5f00\u7ec8\u7aef\uff0c\u4ee5\u547d\u4ee4\u884c\u6a21\u5f0f\u8fd0\u884c\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},'\u2714 Make your choice \xb7 Create a Pokemon\nPokemon number: 25\nPokemon name: Pikachu\nPokemon types: Electric\nResponse { number: 25, name: "Pikachu", types: ["Electric"] }\nGreat! First command implemented, let\'s do the next one!\n')),(0,o.kt)("h2",{id:"\u83b7\u53d6\u6240\u6709\u5b9d\u53ef\u68a6"},"\u83b7\u53d6\u6240\u6709\u5b9d\u53ef\u68a6"),(0,o.kt)("p",null,"\u73b0\u5728\u6211\u4eec\u53bb\u5b9e\u73b0\u83b7\u53d6\u6240\u6709\u5b9d\u53ef\u68a6\uff01\u9996\u5148\u6211\u4eec\u5728\u5bf9\u5e94\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"index")," \u6dfb\u52a0\u76f8\u5e94\u7684\u5904\u7406\u51fd\u6570\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},"match index {\n    0 => fetch_all_pokemons::run(repo.clone()),\n    ...\n};\n")),(0,o.kt)("p",null,"\u521b\u5efa\u6a21\u5757"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},"mod fetch_all_pokemons;\n")),(0,o.kt)("p",null,"\u73b0\u5728\u5b9e\u73b0\u5177\u4f53\u7684\u529f\u80fd\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},'use crate::domain::fetch_all_pokemons;\nuse crate::repositories::pokemon::Repository;\nuse std::sync::Arc;\n\n#[derive(Debug)]\nstruct Response {\n    number: u16,\n    name: String,\n    types: Vec<String>,\n}\n\npub fn run(repo: Arc<dyn Repository>) {\n    match fetch_all_pokemons::execute(repo) {\n        Ok(res) => res.into_iter().for_each(|p| {\n            println!(\n                "{:?}",\n                Response {\n                    number: p.number,\n                    name: p.name,\n                    types: p.types,\n                }\n            );\n        }),\n        Err(fetch_all_pokemons::Error::Unknown) => println!("An unknown error occurred"),\n    };\n}\n')),(0,o.kt)("p",null,"\u6211\u5df2\u7ecf\u8be6\u7ec6\u7684\u89e3\u91ca\u8fc7\u7b2c\u4e00\u4e2a\u4f8b\u5b50\uff0c\u8fd9\u91cc\u5c31\u6ca1\u5fc5\u8981\u4e00\u6b65\u4e00\u6b65\u8bf4\u660e\u4e86\u3002\u8fd9\u4e2a\u547d\u4ee4\u4e0d\u9700\u8981\u4efb\u4f55\u53c2\u8d5b\uff0c\u6240\u4ee5\u4e5f\u4e0d\u9700\u8981\u4efb\u4f55\u63d0\u793a\u4fe1\u606f\uff0c\u6211\u4eec\u53ea\u9700\u8981\u4ece\u5b58\u50a8\u5e93\u62ff\u5230\u7ed3\u679c\uff0c\u4f9d\u6b21\u6253\u5370\u5373\u53ef\u3002"),(0,o.kt)("h2",{id:"\u67e5\u8be2\u4e00\u4e2a\u5b9d\u53ef\u68a6"},"\u67e5\u8be2\u4e00\u4e2a\u5b9d\u53ef\u68a6"),(0,o.kt)("p",null,"\u548c\u4e4b\u524d\u4e00\u6837\uff0c\u521b\u5efa\u4e00\u4e2a\u6a21\u5757\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},"mod fetch_pokemon;\n\n...\n\nmatch index {\n    ...\n    1 => fetch_pokemon::run(repo.clone()),\n    ...\n};\n")),(0,o.kt)("p",null,"\u521b\u5efa\u5bf9\u5e94\u7684\u5904\u7406\u51fd\u6570"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},'use crate::cli::prompt_number;\nuse crate::domain::fetch_pokemon;\nuse crate::repositories::pokemon::Repository;\nuse std::sync::Arc;\n\n#[derive(Debug)]\nstruct Response {\n    number: u16,\n    name: String,\n    types: Vec<String>,\n}\n\npub fn run(repo: Arc<dyn Repository>) {\n    let number = prompt_number();\n\n    let req = match number {\n        Ok(number) => fetch_pokemon::Request { number },\n        _ => {\n            println!("An error occurred during the prompt");\n            return;\n        }\n    };\n    match fetch_pokemon::execute(repo, req) {\n        Ok(res) => println!(\n            "{:?}",\n            Response {\n                number: res.number,\n                name: res.name,\n                types: res.types,\n            }\n        ),\n        Err(fetch_pokemon::Error::BadRequest) => println!("The request is invalid"),\n        Err(fetch_pokemon::Error::NotFound) => println!("The Pokemon does not exist"),\n        Err(fetch_pokemon::Error::Unknown) => println!("An unknown error occurred"),\n    }\n}\n')),(0,o.kt)("p",null,"\u8fd9\u91cc\uff0c\u6211\u4eec\u5148\u5411\u7528\u6237\u8be2\u95ee\u4e86\u7f16\u53f7\uff0c\u5982\u679c\u83b7\u53d6\u5931\u8d25\u4e86\u5c31\u8f93\u51fa\u9519\u8bef\u4fe1\u606f\u3002\u63a5\u7740\u6784\u5efa Request \u7ed3\u6784\u4f53\uff0c\u8c03\u7528\u7528\u4f8b\uff0c\u6210\u529f\u5c31\u6253\u5370\u7ed3\u679c\uff0c\u5426\u5219\u6253\u5370\u9519\u8bef\u4fe1\u606f\u3002"),(0,o.kt)("h1",{id:"\u5220\u9664\u4e00\u4e2a\u5b9d\u53ef\u68a6"},"\u5220\u9664\u4e00\u4e2a\u5b9d\u53ef\u68a6"),(0,o.kt)("p",null,"\u6700\u540e\u4e00\u4e2a\u547d\u4ee4\uff01"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},"mod delete_pokemon;\n\n...\n\nmatch index {\n    ...\n    3 => delete_pokemon::run(repo.clone()),\n    ...\n};\n")),(0,o.kt)("p",null,"\u521b\u5efa\u65b0\u6a21\u5757\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rs"},'use crate::cli::prompt_number;\nuse crate::domain::delete_pokemon;\nuse crate::repositories::pokemon::Repository;\nuse std::sync::Arc;\n\npub fn run(repo: Arc<dyn Repository>) {\n    let number = prompt_number();\n\n    let req = match number {\n        Ok(number) => delete_pokemon::Request { number },\n        _ => {\n            println!("An error occurred during the prompt");\n            return;\n        }\n    };\n    match delete_pokemon::execute(repo, req) {\n        Ok(()) => println!("The Pokemon has been deleted"),\n        Err(delete_pokemon::Error::BadRequest) => println!("The request is invalid"),\n        Err(delete_pokemon::Error::NotFound) => println!("The Pokemon does not exist"),\n        Err(delete_pokemon::Error::Unknown) => println!("An unknown error occurred"),\n    }\n}\n')),(0,o.kt)("p",null,"\u548c\u67e5\u8be2\u4e00\u4e2a\u5b9d\u53ef\u68a6\u57fa\u672c\u4e00\u6837\uff0c\u53ea\u4e0d\u8fc7\u4e0d\u9700\u8981\u8fd4\u56de\u4fe1\u606f\u3002"),(0,o.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,o.kt)("p",null,"\u73b0\u5728\u60a8\u65e0\u9700\u76f4\u63a5\u53d1\u9001 HTTP \u8bf7\u6c42\u5373\u53ef\u5728\u7ec8\u7aef\u4e2d\u4eab\u53d7\u4f7f\u7528\u7a0b\u5e8f : D\n\u4f46\u662f\u4f60\u77e5\u9053\u6211\u4eec\u7f3a\u5c11\u4ec0\u4e48\u5417\uff1f\u4e00\u4e2a\u771f\u6b63\u5b58\u50a8\u6211\u4eec\u7684\u5b9d\u53ef\u68a6\u7684\u5730\u65b9\u3002\u76ee\u524d\uff0c\u5b83\u4eec\u53ea\u5b58\u5728\u4e8e\u5185\u5b58\u4e2d\uff0c\u56e0\u6b64\u6bcf\u6b21\u6211\u4eec\u8fd0\u884c\u7a0b\u5e8f\u65f6\u5b58\u50a8\u5e93\u90fd\u662f\u7a7a\u7684\u3002\u4ece CLI \u521b\u5efa\u6211\u4eec\u7684\u5b9d\u53ef\u68a6\u7136\u540e\u4ece\nAPI \u83b7\u53d6\u5b83\u4eec\u4f1a\u5f88\u9177 : ) \u4e0b\u4e00\u7bc7\u5c06\u662f\u672c\u7cfb\u5217\u7684\u6700\u540e\u4e00\u7bc7\u6587\u7ae0\uff1a\u5b9e\u73b0\u4e00\u4e2a\u957f\u671f\u4fdd\u5b58\u7684\u5b58\u50a8\u5e93\u3002"),(0,o.kt)("p",null,"\u4ee3\u7801\u53ef\u4ee5\u5728 ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/alexislozano/pokedex/tree/article-6"},"Github")," \u4e0a\u67e5\u770b"))}m.isMDXComponent=!0}}]);