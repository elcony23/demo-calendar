# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Demo docs


Home Screen

Appointment types
```
* Design board
* Developers board
* Rh board
```

![alt tag](https://imagesqc.s3.amazonaws.com/home.png)

On the left side you can see the calendar where you can only choose available days. if the day has already an appointment it shows you a circle, the color of the circle depends on the appointment type.
The right side you can see detailed information about the appointments of the day

If you want to create an appointment you need to press the schedule appointment button and opens a dialog create appointment.

## Dialog create appointment

In this part you can generate an appointment, you can choose the hour, appointment type and description about the topic of the appointment.
The add button only be enable when the user writes a description.

![alt tag](https://imagesqc.s3.amazonaws.com/dialog.png)

## Errors

![alt tag](https://imagesqc.s3.amazonaws.com/error1.png)
If you have selected a date that has an appointment it shows you a message

![alt tag](https://imagesqc.s3.amazonaws.com/error2.png)
You can only choose a maximum of 2 appointments per week