# Coding Project

## Get Started

Since we are using native libraries such as AV, notification, etc, this project needs to run using the `development build` instead of Expo Go.
See [https://docs.expo.dev/develop/development-builds/create-a-build/](https://docs.expo.dev/develop/development-builds/create-a-build/) for more info.

### 1. Install dependencies

```
yarn
```
### 2. Build iOS and Android

#### iOS

```
yarn run:ios
```

#### Android

```
yarn run:android
```

### 3. Run server

```
yarn server
```

### 4. Run App

```
yarn start
```

## Objective
This coding project will assess a React Native developer's ability to create a mobile application with
specific functionality. It allows candidates to demonstrate their proficiency in architecture, state
management, and data presentation.

## Overview
Create a React Native application that simulates the notification portion of a chat application. The
application will randomly generate mock notifications and display them to the user. You should
implement a few common notification types (e.g. new mention, friend request, or community invite).
Your UI must allow users to mark notifications as read.

## Requirements
1. **Mock data provider**: Implement a mock data provider that uses in-memory data for notifications. Include some hard-coded initial data so the app has a few notifications to display at startup. You can use any suitable data structure for this purpose. See the following files:
   - [`reducers/notification.ts`](./reducers/notification.ts)
   - [`store/mock.ts`](./store/mock.ts)
   - [`store/index.ts`](./store/index.ts)
2. **Notification system**: Design a notification system that randomly generates notifications to simulate new notifications being received. Each notification should include the notification type and a timestamp. See the following files:
   - [`server/**/*`](./server/) - `express` + `socket` server to mock remote notifications
   - [`services/notification.service.ts`](./services/notification.service.ts)
   - [`hooks/useNotifications.ts`](./hooks/useNotifications.ts)
3. **Notification display**: Create a screen or component to display the list of notifications. The UI should show the notifications, time stamp, and read/unread status. See the following files:
   - [`app/tabs/notifications.tsx`](./app/(tabs)/notifications.tsx)
   - [`components/molecules/NotificationItem.tsx`](./components/molecules/NotificationItem.tsx)
4. **Mark notifications as read**: Implement a feature that allows users to mark notifications as read. When a user taps on a notification, it should change its status to read, and the UI should update accordingly. See the following files:
   - [`reducers/notification.ts`](./reducers/notification.ts)
   - [`components/molecules/NotificationItem.tsx`](./components/molecules/NotificationItem.tsx)
   - [`app/tabs/notifications.tsx`](./app/(tabs)/notifications.tsx)
5. **TypeScript**: Support your application with types that represent your data. See the following files:
   - [`types/*`](./types)

## Submission
Provide either a GitHub repository or email the code as a zip file. Include instructions on how to run the
application, any dependencies needed, and any additional notes you want to share with the reviewer.

## Evaluation Criteria
The candidate's solution will be evaluated based on the following criteria:

1. **Functionality**: Does the application meet the specified requirements?
2. **Code quality**: Is the code well-organized, readable, maintainable, and annotated? Does it follow best practices for React Native development?
3. **Architecture**: Does the project demonstrate good architectural practices, is it designed to be flexible, extensible, and updatable?
4. **State management**: How effectively is the state managed within the application, especially with regards to notifications?