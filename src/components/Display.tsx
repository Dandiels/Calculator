import React from "react";
import
{
    StyleSheet,
    Text,
    View,
    ViewStyle,
    TextStyle
} from "react-native";

type Styles =
{
    display: ViewStyle;
    displayValue: TextStyle;
};

const style: Styles = StyleSheet.create<Styles>
({
    display:
    {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
        alignItems: "flex-end"
    },
    displayValue:
    {
        fontSize: 60,
        color: "#FFF"
    }
});

export default (props: { displayValue: string }): React.JSX.Element =>
{
    const { displayValue } = props;
    
    return (
        <View style={style.display}>
            <Text style={style.displayValue} numberOfLines={1}>
                {displayValue}
            </Text>
        </View>
    );
}