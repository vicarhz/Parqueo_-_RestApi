import React from "react";

export class ApiSpaces extends React.Component {
    render() {
        console.log(this.props.spaces)
        if (!this.props.spaces) {
            return <></>;
        }
        return (<table>           
            <tr>
                <td>Numero</td>
                <td>Estado</td>                
            </tr>
                <tr>
                    <td></td>
                    <td>{this.props.spaces[0]}</td>                                        
                </tr>
                <tr>
                <td></td>
                <td>{this.props.spaces[1]}</td>
                </tr>
                <tr>
                <td></td>
                <td>{this.props.spaces[2]}</td>
                </tr>
        </table>);
    }
}