import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '资料库 | 学习笔记',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Java、Js、Python、GO、Haskell 等语言学习。Git、Docker 等常用命令总结。
      </>
    ),
  },
  {
    title: '个人项目整理总结',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        具体内容参考各项目 README。现有作品有 InnoDB 存储引擎、KV DB、端口转发工具。
      </>
    ),
  },
  {
    title: 'Rust 相关',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        作为 Rustt 翻译组成员，定期翻译优质文章、博客、视频等。还有 Rust 标准库源代码解读。
      </>
    ),
  },
  {
    title: '文章和零散翻译',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Epoll，OCI 规范、OAuth2、以及各种方向的技术文章。
      </>
    ),
  },
  {
    title: '源码阅读',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        核心代码解读、使用 excalidraw 绘制的图示、以及总结。
      </>
    ),
  },
  {
    title: '其他',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        新奇技术体验游玩，包括但不限于 Wasm、Deno、Flutter 等。
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
