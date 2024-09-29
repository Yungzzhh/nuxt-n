---
title: 'Http TPO'
description: 'Http TPO'
time: '2024-09-27'
tag: '#Http'
---


link: [link:https://dbwu.tech/posts/network/what-is-tcp-fast-open/]

## 概述
传统的TCP连接建立需要三次握手，且这三次握手不传输数据。这导致了一些效率和延迟问题。TFO是对TCP三次握手过程的优化，允许在握手过程中发送数据，从而减少延迟。

##TFO的实现原理
首次连接：发送方发送SYN报文，接收方返回SYN-ACK报文并附带一个TFO Cookie，发送方收到后保存Cookie并完成三次握手。
后续连接：发送方在SYN报文中携带Cookie和应用数据，接收方验证Cookie后，可以在第一次握手时直接处理数据。
## 优点
减少了发送方和接收方首次发送数据的延迟。

## 局限性
兼容性：需要通信双方都支持TFO。
安全性：增加了接收方的安全攻击面。
部署环境要求：对内核版本有要求，需要修改内核参数。
应用数据过大：如果数据大于TCP的MSS，优势不明显。

## 模拟环境
使用两个Linux服务器进行实验，内核版本需≥3.7。
需要修改内核参数来启用TFO。

## 程序代码
提供了服务端和客户端的Python代码示例。

## 运行程序实验
启动服务端程序并确认监听状态。
客户端开始抓包。
运行客户端程序。
查看客户端TCP连接状态。

##  WireShark抓包结果分析
分析了第一次和后续建立连接时的WireShark抓包结果。