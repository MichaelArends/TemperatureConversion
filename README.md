# Temperature Conversion Worksheet Grading

Temperature Conversion Worksheet Grading is a tool to input worksheet questions and student responses.  You can submit the fields and get back whether the answers was correct or incorrect.  The tool will also let you know if the starting number is invalid.

## Installation

In your terminal, run `npm install` on the root directory of these files.

```bash
npm install
```

## Usage

To start this program run `npm run dev` in the root folder after installation.

```bash
npm run dev
```

Your default browser window should open to the tool.  If it does not, you can open your browser and go to localhost:3000 and the page will appear.

## Data Model

You can use a different tool to connect to the server.   The server will be running on localhost:5000/express_backend as a **POST** method.

The server accepts a JSON array of your data.


```javascript
[{
    tempInput: "",      //String temperature number.
    tempInputType: "",  //Type of the initial question.
    targetUnits: "",    //Type your student is converting to.
    studentResponse: "" //String version of the students answers.
}]
```

The temperature input type and target units can be as follows:
- Celsius
- Fahrenheit
- Kelvin
- Rankine

## License
[MIT](https://choosealicense.com/licenses/mit/)# TemperatureConversion
