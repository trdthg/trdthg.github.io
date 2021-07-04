(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{374:function(a,t,s){"use strict";s.r(t);var o=s(45),e=Object(o.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"使用vm搭建hadoop集群"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用vm搭建hadoop集群"}},[a._v("#")]),a._v(" 使用VM搭建hadoop集群")]),a._v(" "),s("h2",{attrs:{id:"_1-准备"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-准备"}},[a._v("#")]),a._v(" 1. 准备")]),a._v(" "),s("ul",[s("li",[a._v("centos7.5镜像")]),a._v(" "),s("li",[a._v("JDK8")]),a._v(" "),s("li",[a._v("Hadoop")]),a._v(" "),s("li",[s("a",{attrs:{href:"https://www.cnblogs.com/aeolian/p/8882790.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("参考链接"),s("OutboundLink")],1)])]),a._v(" "),s("h2",{attrs:{id:"_2-安装hadoop101虚拟机"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-安装hadoop101虚拟机"}},[a._v("#")]),a._v(" 2. 安装hadoop101虚拟机")]),a._v(" "),s("ul",[s("li",[a._v("软件选择: 最小安装是纯命令行")]),a._v(" "),s("li",[a._v("安装位置: 选择手动和以自由配置盘符配置及大小, 设备类型(LVM相比于标准分区能自由扩缩容)")]),a._v(" "),s("li",[a._v("KDUMP可以暂时不要")]),a._v(" "),s("li",[a._v("设置用户名密码: 示例 username: hadoop101 password: 000000")])]),a._v(" "),s("h2",{attrs:{id:"_3-配置本机网络环境"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-配置本机网络环境"}},[a._v("#")]),a._v(" 3. 配置本机网络环境")]),a._v(" "),s("ol",[s("li",[a._v("关闭防火墙")]),a._v(" "),s("li",[a._v("VM配置VMnet8"),s("br"),a._v("\n编辑 -> 虚拟网络编辑器")])]),a._v(" "),s("ul",[s("li",[s("img",{attrs:{src:"otherhadoop1.png",alt:"示例1"}})]),a._v(" "),s("li",[s("img",{attrs:{src:"otherhadoop2.png",alt:"示例1"}})])]),a._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[a._v("Windows配置VMnet8"),s("br"),a._v(" "),s("img",{attrs:{src:"otherhadoop3.png",alt:"示例1"}})])]),a._v(" "),s("h2",{attrs:{id:"_4-配置虚拟机网络环境"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-配置虚拟机网络环境"}},[a._v("#")]),a._v(" 4. 配置虚拟机网络环境")]),a._v(" "),s("ol",[s("li",[a._v("关闭虚拟机防火墙: "),s("code",[a._v("systemctl disable firewalld.service")])]),a._v(" "),s("li",[a._v("关闭NetworkManage:")])]),a._v(" "),s("ul",[s("li",[s("code",[a._v("systemctl stop NetworkManager")])]),a._v(" "),s("li",[s("code",[a._v("systemctl disable NetworkManager")])])]),a._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[a._v("!!!修改网卡配置:")])]),a._v(" "),s("ul",[s("li",[s("code",[a._v("vim /etc/sysconfig/network-scripts/ifcfg-ens33")])])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("BOOTPROTO=static  #启用静态IP地址 ,默认为dhcp\nIPADDR=192.168.182.3  #设置IP地址(这台虚拟机想要的ip) \nNETMASK=255.255.225.0  #设置子网掩码 \nGATEWAY=192.168.182.2  #设置网关(和外部的网关相同)\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[a._v("重启网卡: "),s("code",[a._v("service network restart")]),a._v("\n可以通过"),s("code",[a._v("ping 8.8.8.8")]),a._v("检测是否通")])]),a._v(" "),s("h2",{attrs:{id:"_5-克隆前"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-克隆前"}},[a._v("#")]),a._v(" 5. 克隆前")]),a._v(" "),s("ol",[s("li",[a._v("安装辅助包管理器: "),s("code",[a._v("yum install -y epel-release")])]),a._v(" "),s("li",[a._v("未知: "),s("code",[a._v("kill -9 3030")])]),a._v(" "),s("li",[a._v("卸载系统自带JDK:")])]),a._v(" "),s("ul",[s("li",[a._v("查看: "),s("code",[a._v("rpm -qa | grep java")])]),a._v(" "),s("li",[a._v("卸载: "),s("code",[a._v("sudo yum remove packagename")])])]),a._v(" "),s("ol",{attrs:{start:"4"}},[s("li",[a._v("修改虚拟机host")])]),a._v(" "),s("ul",[s("li",[a._v("修改hostname如下: "),s("code",[a._v("nano /etc/hostname")])])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("hadoop101\n")])])]),s("ul",[s("li",[a._v("修改hosts如下: "),s("code",[a._v("nano /etc/hosts")])])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4\n::1         localhost localhost.localdomain localhost6 localhost6.localdomain6\n\n192.168.93.21 hadoop101\n192.168.93.22 hadoop102\n192.168.93.23 hadoop103\n")])])]),s("h2",{attrs:{id:"_6-克隆-完整克隆-后"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-克隆-完整克隆-后"}},[a._v("#")]),a._v(" 6. 克隆(完整克隆)后")]),a._v(" "),s("ol",[s("li",[a._v("通过vmware进行clone出n台相同的虚拟机")])]),a._v(" "),s("ul",[s("li",[a._v("修改每台克隆出的网卡IPADDR: "),s("code",[a._v("vim /etc/sysconfig/network-scripts/ifcfg-ens33")])]),a._v(" "),s("li",[a._v("修改hostname: "),s("code",[a._v("nano /etc/hostname")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);