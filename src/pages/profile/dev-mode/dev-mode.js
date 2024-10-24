import React from 'react';
import {Button, Text, View} from 'react-native';

import {useSettings} from "../../../contexts/settings.context";
import {useLogger} from "../../../hooks/useLogger";

export const DevMode = () => {
    const [settings] = useSettings();
    const [,resetLogger] = useLogger();

    return (
        <View>
            <Text>
                errors: {settings['errors'].join(', ')}
            </Text>
            <Button title={'Rest'} onPress={() => resetLogger()} />
        </View>
    );
};
