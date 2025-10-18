import React, {useEffect, useState} from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import * as Speech from "expo-speech";

import {useSettings} from "../../../contexts/settings.context";
import {useLogger} from "../../../hooks/useLogger";

export const DevMode = () => {
    const [settings] = useSettings();
    const [,resetLogger] = useLogger();
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        Speech.getAvailableVoicesAsync()
            .then(profiles => setProfiles(profiles));
    }, []);

    return (
        <ScrollView>
            <Text>
                errors: {settings['errors'].join(', ')}
            </Text>
            <Text>
                voices: {profiles.map(profile => `${profile.identifier}${profile.name}---`)}
            </Text>
            <Button title={'Rest'} onPress={() => resetLogger()} />
        </ScrollView>
    );
};
