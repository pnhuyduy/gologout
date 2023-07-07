type TMode = "noise" | "mask" | "block" | "off"

interface IOptions {
  userDataDir: string
  audioContext: TMode
  canvas: TMode
  clientRects: TMode
  webGL: TMode
  webGLMetadata: TMode
}

interface IProxy {
  mode: "http" | "socks" | null
  host: string
  port: number
  username: string
  password: string
}

interface IProfile {
  proxy: IProxy
  timezone: string
}

declare const getNewFingerprint: (payload: IProfile, options: IOptions) => {
    gologin: {
        audioContext: {
            enable: boolean;
            noiseValue: number;
        };
        canvasMode: string;
        canvasNoise: number;
        client_rects_noise_enable: boolean;
        deviceMemory: number;
        dns: string;
        doNotTrack: boolean;
        geoLocation: {
            accuracy: number;
            latitude: number;
            longitude: number;
            mode: string;
        };
        getClientRectsNoice: number;
        get_client_rects_noise: number;
        hardwareConcurrency: number;
        is_m1: boolean;
        langHeader: string;
        languages: string;
        mediaDevices: {
            audioInputs: number;
            audioOutputs: number;
            enable: boolean;
            uid: string;
            videoInputs: number;
        };
        mobile: {
            device_scale_factor: number;
            enable: boolean;
            height: number;
            width: number;
        };
        name: string;
        navigator: {
            max_touch_points: number;
            platform: string;
        };
        plugins: {
            all_enable: boolean;
            flash_enable: boolean;
        };
        profile_id: string;
        proxy: {
            password: string;
            username: string;
        };
        screenHeight: number;
        screenWidth: number;
        startupUrl: string;
        startup_urls: string[];
        storage: {
            enable: boolean;
        };
        timezone: {
            id: string;
        };
        unpinable_extension_names: string[];
        userAgent: string;
        webGl: {
            mode: boolean;
            renderer: string;
            vendor: string;
        };
        webRtc: {
            fill_based_on_ip: boolean;
            local_ip_masking: boolean;
            mode: string;
            public_ip: string;
        };
        webgl: {
            metadata: {
                mode: boolean;
                renderer: string;
                vendor: string;
            };
        };
        webglNoiceEnable: boolean;
        webglNoiseValue: number;
        webglParams: {
            antialiasing: boolean;
            extensions: string[];
            glCanvas: string;
            glParamValues: ({
                name: string;
                value: {
                    "0": number;
                    "1": number;
                };
            } | {
                name: string[];
                value: string;
            } | {
                name: string;
                value: number;
            } | {
                name: string;
                value: string;
            })[];
            shaiderPrecisionFormat: string;
            supportedFunctions: {
                name: string;
                supported: boolean;
            }[];
            textureMaxAnisotropyExt: number;
        };
        webgl_noice_enable: boolean;
        webgl_noise_enable: boolean;
        webgl_noise_value: number;
    };
    NewTabPage: {
        PrevNavigationTime: string;
    };
    account_id_migration_state: number;
    account_tracker_service_last_update: string;
    ack_existing_ntp_extensions: boolean;
    alternate_error_pages: {
        backup: boolean;
    };
    apps: {};
    autocomplete: {
        retention_policy_last_version: number;
    };
    autofill: {
        orphan_rows_removed: boolean;
    };
    bookmark_bar: {
        show_on_all_tabs: boolean;
    };
    browser: {
        has_seen_welcome_page: boolean;
        window_placement: {
            bottom: number;
            left: number;
            maximized: boolean;
            right: number;
            top: number;
            work_area_bottom: number;
            work_area_left: number;
            work_area_right: number;
            work_area_top: number;
        };
    };
    countryid_at_install: number;
    custom_links: {
        initialized: boolean;
        list: never[];
    };
    default_apps_install_state: number;
    domain_diversity: {
        last_reporting_timestamp: string;
    };
    extensions: {
        alerts: {
            initialized: boolean;
        };
        chrome_url_overrides: {};
        last_chrome_version: string;
        settings: {};
    };
    gaia_cookie: {
        changed_time: number;
        hash: string;
        last_list_accounts_data: string;
    };
    gcm: {
        product_category_for_subtypes: string;
    };
    google: {
        services: {
            signin_scoped_device_id: string;
        };
    };
    intl: {
        selected_languages: string;
    };
    invalidation: {
        per_sender_topics_to_handler: {
            "1013309121859": {};
            "8181035976": {};
        };
    };
    media: {
        device_id_salt: string;
        engagement: {
            schema_version: number;
        };
    };
    media_router: {
        receiver_id_hash_token: string;
    };
    ntp: {
        num_personal_suggestions: number;
    };
    optimization_guide: {
        previously_registered_optimization_types: {
            ABOUT_THIS_SITE: boolean;
            HISTORY_CLUSTERS: boolean;
        };
        store_file_paths_to_delete: {};
    };
    plugins: {
        plugins_list: never[];
    };
    privacy_sandbox: {
        preferences_reconciled: boolean;
    };
    profile: {
        avatar_bubble_tutorial_shown: number;
        avatar_index: number;
        content_settings: {
            enable_quiet_permission_ui_enabling_method: {
                notifications: number;
            };
            exceptions: {
                accessibility_events: {};
                app_banner: {};
                ar: {};
                auto_select_certificate: {};
                automatic_downloads: {};
                autoplay: {};
                background_sync: {};
                bluetooth_chooser_data: {};
                bluetooth_guard: {};
                bluetooth_scanning: {};
                camera_pan_tilt_zoom: {};
                client_hints: {};
                clipboard: {};
                cookies: {};
                durable_storage: {};
                fedcm_active_session: {};
                fedcm_share: {};
                file_system_access_chooser_data: {};
                file_system_last_picked_directory: {};
                file_system_read_guard: {};
                file_system_write_guard: {};
                formfill_metadata: {};
                geolocation: {};
                get_display_media_set_select_all_screens: {};
                hid_chooser_data: {};
                hid_guard: {};
                http_allowed: {};
                idle_detection: {};
                images: {};
                important_site_info: {};
                insecure_private_network: {};
                installed_web_app_metadata: {};
                intent_picker_auto_display: {};
                javascript: {};
                javascript_jit: {};
                legacy_cookie_access: {};
                local_fonts: {};
                media_engagement: {};
                media_stream_camera: {};
                media_stream_mic: {};
                midi_sysex: {};
                mixed_script: {};
                nfc_devices: {};
                notifications: {};
                password_protection: {};
                payment_handler: {};
                permission_autoblocking_data: {};
                permission_autorevocation_data: {};
                popups: {};
                ppapi_broker: {};
                protocol_handler: {};
                safe_browsing_url_check_data: {};
                sensors: {};
                serial_chooser_data: {};
                serial_guard: {};
                site_engagement: {};
                sound: {};
                ssl_cert_decisions: {};
                storage_access: {};
                subresource_filter: {};
                subresource_filter_data: {};
                usb_chooser_data: {};
                usb_guard: {};
                vr: {};
                webid_api: {};
                window_placement: {};
            };
            pref_version: number;
        };
        created_by_version: string;
        creation_time: string;
        exit_type: string;
        last_engagement_time: string;
        last_time_password_store_metrics_reported: number;
        managed_user_id: string;
        name: string;
        password_account_storage_settings: {};
    };
    safebrowsing: {
        event_timestamps: {};
        metrics_last_log_time: string;
    };
    signin: {
        allowed: boolean;
    };
    sync: {
        requested: boolean;
    };
    translate_site_blacklist: never[];
    translate_site_blacklist_with_time: {};
    unified_consent: {
        migration_state: number;
    };
    web_apps: {
        system_web_app_failure_count: number;
        system_web_app_last_attempted_language: string;
        system_web_app_last_attempted_update: string;
        system_web_app_last_installed_language: string;
        system_web_app_last_update: string;
    };
    webauthn: {
        touchid: {
            metadata_secret: string;
        };
    };
};
declare const spawnArgs: (options: Pick<IOptions, "userDataDir">, payload: IProfile) => string[];

declare const generator_getNewFingerprint: typeof getNewFingerprint;
declare const generator_spawnArgs: typeof spawnArgs;
declare namespace generator {
  export {
    generator_getNewFingerprint as getNewFingerprint,
    generator_spawnArgs as spawnArgs,
  };
}

declare const randomInt: (min: number, max: number) => number;
declare const randomFloat: (min: number, max: number) => number;
declare const randomUID: (length?: number) => string;
declare const randomWebGL: () => {
    mode: boolean;
    renderer: string;
    vendor: string;
};
declare const extractProxyInfo: (d: string) => {
    ip: string;
    country: string;
    timezone: string;
    latitude: string;
    longitude: string;
    accuracy: null;
} | null;
declare const checkTimezone: (proxy: IProxy) => Promise<null | {
    ip: string;
    country: string;
    timezone: string;
    latitude: string;
    longitude: string;
    accuracy: null | number;
}>;

declare const utils_randomInt: typeof randomInt;
declare const utils_randomFloat: typeof randomFloat;
declare const utils_randomUID: typeof randomUID;
declare const utils_randomWebGL: typeof randomWebGL;
declare const utils_extractProxyInfo: typeof extractProxyInfo;
declare const utils_checkTimezone: typeof checkTimezone;
declare namespace utils {
  export {
    utils_randomInt as randomInt,
    utils_randomFloat as randomFloat,
    utils_randomUID as randomUID,
    utils_randomWebGL as randomWebGL,
    utils_extractProxyInfo as extractProxyInfo,
    utils_checkTimezone as checkTimezone,
  };
}

export { generator, utils };
