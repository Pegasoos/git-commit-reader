 const formatDate = (date:string) => {
        return `${new Date(date).getHours()}:${new Date(date).getMinutes()} on ${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
          new Date(date).getFullYear() + 5
        }`;
      };

export default formatDate;
