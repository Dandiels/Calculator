import React from "react";
import
{
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight,
    TextStyle
} from "react-native";

type Styles =
{
    button: TextStyle;
    operationButton: TextStyle;
    buttonDouble: TextStyle;
    buttonTriple: TextStyle;
}

const style: Styles = StyleSheet.create<Styles>
({
    button:
    {
        fontSize: 40,
        height: Dimensions.get("window").width / 4,
        width: Dimensions.get("window").width / 4,
        padding: 20,
        backgroundColor: "#F0F0F0",
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#888"
    },
    operationButton:
    {
        color: "#FFF",
        backgroundColor: "#FA8231"
    },
    buttonDouble:
    {
        width: (Dimensions.get("window").width / 4) * 2
    },
    buttonTriple:
    {
        width: (Dimensions.get("window").width / 4) * 3
    }
});

export default (props: { label: string, operation?: boolean, double?: boolean, triple?: boolean, onClick: (label: string) => void }): React.JSX.Element =>
{
    const { label, operation, double, triple, onClick } = props;

    const styleButton = [style.button];
    
    if (double) styleButton.push(style.buttonDouble);

    if (triple) styleButton.push(style.buttonTriple);

    if (operation) styleButton.push(style.operationButton);
    
    return (
        <TouchableHighlight onPress={() => onClick(label)}>
            <Text style={styleButton}>{label}</Text>
        </TouchableHighlight>
    );
}