import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class TypingText extends Component
{
  constructor()
  {
    super();

    this.index = 0;

    this.typing_timer = -1;

    this.blinking_cursor_timer = -1;

    this.state = { text: '', blinking_cursor_color: 'transparent' }
  }

  componentDidMount()
  {
    this.typingAnimation();
    this.blinkingCursorAnimation();
  }

  componentWillUnmout()
  {
    clearTimeout( this.typing_timer );

    this.typing_timer = -1;

    clearInterval( this.blinking_cursor_timer );

    this.blinking_cursor_timer = -1;
  }

  typingAnimation = () =>
  {
    const { text = "Default Typing Animated Text.", typingAnimationDuration = 50 } = this.props;
    clearTimeout( this.typing_timer );

    this.typing_timer  = -1;

    if( this.index < text.length )
    {
      if( this.refs.animatedText )
      {
        this.setState({ text: this.state.text + text.charAt( this.index ) }, () =>
        {
          this.index++;

          this.typing_timer = setTimeout(() =>
          {
            this.typingAnimation();
          }, typingAnimationDuration);
        });
      }
    }
  }

  blinkingCursorAnimation = () =>
  {
    const { color = "rgb( 77, 192, 103 )", blinkingCursorAnimationDuration = 190 } = this.props;
    this.blinking_cursor_timer = setInterval(() =>
    {
      if( this.refs.animatedText )
      {
        if( this.state.blinking_cursor_color == 'transparent' )
          this.setState({ blinking_cursor_color: color });
        else
          this.setState({ blinking_cursor_color: 'transparent' });
      }
    }, blinkingCursorAnimationDuration);
  }

  render()
  {
    const { color = "rgb( 77, 192, 103 )", textSize = 30 } = this.props;
    return(
      <View>
        <Text ref = "animatedText" style = {{ color, fontSize: textSize, textAlign: 'center' }}>{ this.state.text }
          <Text style = {{ color: this.state.blinking_cursor_color }}>|</Text>
        </Text>
      </View>
    );
  }
}
