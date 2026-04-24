---
title: Reinforcement learning
sidebar_position: 8
---

Reinforcement learning is an agent-based machine learning paradigm that has been used for several decades across various fields, including computer science, engineering, robotics, gaming, resource management and the optimisation of various processes. 

The conceptual foundations of reinforcement learning draw on several earlier fields, including observations of animal behaviour, optimal control, dynamic programming, and Markov Decision Processes (MDPs) and the use of policy iteration for solving them, temporal-difference learning, as well as early computational investigations of trial-and-error learning. 

What sets this adaptable computational approach apart from other machine learning paradigms is that it does not rely on labelled or unlabelled datasets. Instead, the agent learns through feedback based on its interactions within the environment. An autonomous learning agent performs task-oriented actions within an interactive environment, transitioning to new states. The agent learns through a trial-and-error process, receiving rewards for correct actions and penalties for incorrect actions based on a designed reward function. These feedback signals help the agent determine which actions yield the greatest rewards, with the goal of maximising the total accumulated reward over a specified time period. 

The agent’s model represents its understanding of the environment, and reinforcement learning algorithms can be categorised based on whether they use a model.  Model-free methods learn policies or value functions directly from experience, without relying on an explicit model of the environment. Model-based methods, in contrast, use an internal model to plan actions by considering possible future states and the associated rewards before they are experienced. Model-free methods are often simpler and more flexible, while model-based methods can be more sample-efficient and capable of long-term planning.

The key challenge in reinforcement learning that arises across various applications with different objectives is the trade-off between exploration and exploitation. The agent must balance the need to explore new actions to discover potentially better outcomes with the need to exploit known strategies to maximise rewards. Additional challenges include partial observability, non-stationarity, and noise present in simulated environments, as well as managing a time-consuming learning process.
