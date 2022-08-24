// color
const colors = {
    white: '#fff',
    black: '#0e0e0e',
    grey: '#f6f8fa',
    pointColor: '#061673',
    green: '#2c7c35',
    yellow: '#3d4e88'
  };

  
  
  const common = {
    feedbackBoxStyle: `
        border-radius: 20px;
        background-color:  #fff;
        padding: 1em 1.3em;
        box-shadow:  inset 1px 1px 2px #BABECC, inset -1px -1px 2px #f6f8fa;
        margin-bottom: 1em;
        box-sizing: border-box;
        `,
    feedbackBoxInnerStyle: `
        .flex {
            display: flex;
            .left-box {
                flex: 0;
                margin-right: 12px;
                .checkbox {
                    margin-top: 10px;
                    input {
                        display: none;
                    }
                    input:checked+label {
                        box-shadow:  inset .2rem .2rem .5rem #BABECC, 
                            inset -.2rem -.2rem .5rem #fff;
                    }
                    label {
                    box-shadow: .3rem .3rem .6rem #c8d0e7, 
                        -.2rem -.2rem .5rem #fff;
                        cursor: pointer;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                        border-radius: .5rem;
                        width: 1.2rem;
                        height: 1.2rem;
                        padding: .3em;
                        }
            }
        }`
  }
  
  export const theme = {
    colors,
    common,
  };