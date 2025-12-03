#!/usr/bin/env python3
"""
LangGraphのグラフ構造を可視化するスクリプト
"""
from agent.core import create_agent

def main():
    # エージェントを作成
    agent = create_agent()
    
    # Mermaid形式で出力
    print("=== Mermaid Diagram ===")
    print(agent.get_graph().draw_mermaid())
    print("\n")
    print("上記の出力を https://mermaid.live/ に貼り付けて可視化できます")

if __name__ == "__main__":
    main()
