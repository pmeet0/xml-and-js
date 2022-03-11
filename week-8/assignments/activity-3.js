/**
 * 1. Replace regular functions with arrow functions
 * 2. Fix callback hell by rewriting it with async/await
 * 3. Make sure the "Finish" is logged after all the data is converted
 */

 const timeout = (ms) => new Promise(resolve => { setTimeout(resolve, ms);
})


const generateRandomNumber = () => Math.floor(Math.random() * 40);


const generateData = async () => 
timeout(2000).then(() => Array.from({ length: 20 }, generateRandomNumber))


const convertToFeet = (meters) => 
timeout(3100).then(() => (meters * 3.2808))

const processData = async (data, converterFn) =>
    await Promise.all(data.map(async (value) => {
        return { val: value, res: await converterFn(value) };
    }))



const logResult = (meters, feet) => console.log(`Converted ${meters}m to ${feet}ft`);


const main = async () => {
    console.log("Start");
    let data = await generateData()
    let processedData = await processData(data, convertToFeet)
    processedData.forEach(element => {
        logResult(element.val, element.res)
    })
    console.log("Finish");
}

main();