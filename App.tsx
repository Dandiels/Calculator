import React, { Component } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import Button from "./src/components/Button";
import Display from "./src/components/Display";

const initialState =
{
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
};

export default class App extends Component
{
    state = { ...initialState };

    addDigit = (digit: string): void =>
    {
        const clearDisplay = this.state.displayValue === "0" || this.state.clearDisplay;
        const currentValue = clearDisplay ? "" : this.state.displayValue;
        const displayValue = currentValue + digit;

        if (digit === "." && !clearDisplay && this.state.displayValue.includes("."))
        {
            return;
        }

        this.setState({ displayValue, clearDisplay: false });

        if (digit !== ".")
        {
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[this.state.current] = newValue;

            this.setState({ values });
        }
    }

    clearMemory = (): void =>
    {
        this.setState({ ...initialState });
    }

    setOperation = (operation: string): void =>
    {
        if (this.state.current === 0)
        {
            this.setState({ operation, current: 1, clearDisplay: true });
        }
        else
        {
            const equals = operation === "=";
            const values = [...this.state.values];

            try
            {
                values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
            }
            catch (error)
            {
                values[0] = this.state.values[0];
            }

            values[1] = 0;

            this.setState({ displayValue: `${values[0]}`, operation: equals ? null : operation, current: equals ? 0 : 1, clearDisplay: true, values });
        }
    }
    
    render(): React.JSX.Element
    {
        const { displayValue } = this.state;
        
        return (
            <View style={style.container}>
                <Display displayValue={displayValue} />
                <View style={style.buttons}>
                    <View style={style.row}>
                        <Button label="AC" triple onClick={this.clearMemory} />
                        <Button label="/" operation onClick={this.setOperation} />
                    </View>
                    <View style={style.row}>
                        <Button label="7" onClick={this.addDigit} />
                        <Button label="8" onClick={this.addDigit} />
                        <Button label="9" onClick={this.addDigit} />
                        <Button label="*" operation onClick={this.setOperation} />
                    </View>
                    <View style={style.row}>
                        <Button label="4" onClick={this.addDigit} />
                        <Button label="5" onClick={this.addDigit} />
                        <Button label="6" onClick={this.addDigit} />
                        <Button label="-" operation onClick={this.setOperation} />
                    </View>
                    <View style={style.row}>
                        <Button label="1" onClick={this.addDigit} />
                        <Button label="2" onClick={this.addDigit} />
                        <Button label="3" onClick={this.addDigit} />
                        <Button label="+" operation onClick={this.setOperation} />
                    </View>
                    <View style={style.row}>
                        <Button label="0" double onClick={this.addDigit} />
                        <Button label="." onClick={this.addDigit} />
                        <Button label="=" operation onClick={this.setOperation} />
                    </View>
                </View>
            </View>
        );
    }
}

type Styles =
{
    container: ViewStyle;
    buttons: ViewStyle;
    row: ViewStyle;
}

const style: Styles = StyleSheet.create<Styles>
({
    container:
    {
        flex: 1
    },
    buttons:
    {
        flexWrap: "wrap"
    },
    row:
    {
        flexDirection: "row"
    }
});