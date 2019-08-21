const User = require('../../model/user');

module.exports = {
    updateUserEntryInfo : async (request, response, next) => {
        try {
            const name = request.body.name;
            const isEntry = request.body.isEntry;
            const month = {
                "Jan" : "01",
                "feb" : "02",
                "Mar" : "03",
                "Apr" : "04",
                "May" : "05",
                "Jun" : "06",
                "Jul" : "07",
                "Aug" : "08",
                "Sep" : "09",
                "Oct" : "10",
                "Nov" : "11",
                "Dec" : "12"
            }
            const dateArr = new Date().toString().split(" ");
            const date = dateArr[3]+month[dateArr[1]]+dateArr[2];
            const time = dateArr[4];
            const user = await User.findOneByName(name);
            const entryLog = JSON.parse(user.entryLog);
            if(!entryLog[date]) {
                entryLog[date] = {"entryTime": null, "exitTime": null};
            }
            if (isEntry && !user.entryTime) {
                user.entryTime = time;
                entryLog[date].entryTime = time;
            } else if(!isEntry) {
                user.exitTime = time;
                entryLog[date].exitTime = time;
            }
            user.entryLog = JSON.stringify(entryLog);
            await user.save();
            next();
        } catch(error) {
            next(error);
        }
    },

    sendRequestToOpen : (request, response) => {
        try {
            const requestModule = require('request');
            const name = request.body.name;
            const options = {
                uri: SlackHookURL,
                method: 'POST',
                body:{
                  "text":`${name}님이 원한다. '열어!'`
                },
                json:true
            };
            requestModule.post(options, (err) => {
                if (err) { return console.log(err);}
            });
            response.send("success");
        } catch(error) {
            next(error);
        }
    }
}
