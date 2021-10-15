import React from 'react';

export default class ListePlat extends React.Component {
    render() {
        return (
            <>
                <div class="grid">
                    <img src={this.props.plat.image} />
                    <div class="grid__body">
                        <div class="relative">
                            <h1 class="grid__title">{this.props.plat.nom}</h1>
                            <p class="grid__author">{this.props.plat.description}</p>
                        </div>
                        <div class="mt-auto" >
                            <span class="grid__tag">{this.props.plat.prix} euros</span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}