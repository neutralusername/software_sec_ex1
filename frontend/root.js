export class root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           generatedPasswords: [],
           number: 10,
        }
    }

    render() {
        let generatedPasswords = this.state.generatedPasswords.map((password) => {
            return React.createElement(
                "div", {
                    style: {
                        padding: "10px",
                        border: "1px solid #000",
                        borderRadius: "5px",
                        margin: "10px",
                    },
                },
                password
            );
        });
        return React.createElement(
            "div", {
                id: "root",
                onContextMenu: (e) => {
                    e.preventDefault();
                },
                style: {
                    fontFamily: "sans-serif",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    touchAction: "none",
                    userSelect: "none",
                },
            },
            React.createElement("input", {
                type: "number",
                value: this.state.number,
                onChange: (e) => {
                    this.setState({ number: e.target.value });
                },
                max :10,
                min :1,
            }),
            React.createElement("button", {
                onClick: () => {
                    fetch("/generate/"+this.state.number)
                        .then((response) => response.body)
                        .then((data) => {
                            let reader = data.getReader();
                            reader.read().then(({ done, value }) => {
                                let decoder = new TextDecoder();
                                let passwords = decoder.decode(value);
                                this.setState({
                                    generatedPasswords: JSON.parse(passwords),
                                });
                            });
                        });
                },
            }, "generate"),
            generatedPasswords,
        );
    }
}