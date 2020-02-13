// Browser EasterEgg
const easterEgg = () => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log(
      '%c Hello hacker friend                        \n If you want to review the code, be my guest\nhttps://github.com/devalnor/maxime.io/',
      'font-size:18px; background-color:#3865FF; color:white'
    );
  }
};

export default easterEgg;
