<?php

use Spatie\Ignition\Solutions\SolutionProviders\BadMethodCallSolutionProvider;
use Spatie\Ignition\Solutions\SolutionProviders\MergeConflictSolutionProvider;
use Spatie\Ignition\Solutions\SolutionProviders\UndefinedPropertySolutionProvider;
use Spatie\LaravelIgnition\Recorders\DumpRecorder\DumpRecorder;
use Spatie\LaravelIgnition\Recorders\JobRecorder\JobRecorder;
use Spatie\LaravelIgnition\Recorders\LogRecorder\LogRecorder;
use Spatie\LaravelIgnition\Recorders\QueryRecorder\QueryRecorder;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\DefaultDbNameSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\GenericLaravelExceptionSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\IncorrectValetDbCredentialsSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\InvalidRouteActionSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\MissingAppKeySolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\MissingColumnSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\MissingImportSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\MissingLivewireComponentSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\MissingMixManifestSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\MissingViteManifestSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\OpenAiSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\RunningLaravelDuskInProductionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\SailNetworkSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\TableNotFoundSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\UndefinedViewVariableSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\UnknownMariadbCollationSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\UnknownMysql8CollationSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\UnknownValidationSolutionProvider;
use Spatie\LaravelIgnition\Solutions\SolutionProviders\ViewNotFoundSolutionProvider;

return [

    /*
    |--------------------------------------------------------------------------
    | Editor
    |--------------------------------------------------------------------------
    |
    | Choose your preferred editor to use when clicking any edit button.
    |
    | Supported: "phpstorm", "vscode", "vscode-insiders", "textmate", "emacs",
    |            "sublime", "atom", "nova", "macvim", "idea", "netbeans",
    |            "xdebug", "phpstorm-remote"
    |
    */

    'editor' => env('IGNITION_EDITOR', 'vscode'),

    /*
    |--------------------------------------------------------------------------
    | Theme
    |--------------------------------------------------------------------------
    |
    | Here you may specify which theme Ignition should use.
    |
    | Supported: "light", "dark", "auto"
    |
    */

    'theme' => env('IGNITION_THEME', 'dark'),

    /*
    |--------------------------------------------------------------------------
    | Sharing
    |--------------------------------------------------------------------------
    |
    | You can share local errors with colleagues or others around the world.
    | Sharing is completely free and doesn't require an account on Flare.
    |
    | If necessary, you can completely disable sharing below.
    |
    */

    'enable_share_button' => env('IGNITION_SHARING_ENABLED', true),

    /*
    |--------------------------------------------------------------------------
    | Register Ignition commands
    |--------------------------------------------------------------------------
    |
    | Ignition comes with an additional make command that lets you create
    | new solution classes more easily. To keep your default Laravel
    | installation clean, this command is not registered by default.
    |
    | You can enable the command registration below.
    |
    */

    'register_commands' => env('REGISTER_IGNITION_COMMANDS', false),

    /*
    |--------------------------------------------------------------------------
    | Solution Providers
    |--------------------------------------------------------------------------
    |
    | List of solution providers that should be loaded. You may specify additional
    | providers as fully qualified class names.
    |
    */

    'solution_providers' => [
        // from spatie/ignition
        BadMethodCallSolutionProvider::class,
        MergeConflictSolutionProvider::class,
        UndefinedPropertySolutionProvider::class,

        // from spatie/laravel-ignition
        IncorrectValetDbCredentialsSolutionProvider::class,
        MissingAppKeySolutionProvider::class,
        DefaultDbNameSolutionProvider::class,
        TableNotFoundSolutionProvider::class,
        MissingImportSolutionProvider::class,
        InvalidRouteActionSolutionProvider::class,
        ViewNotFoundSolutionProvider::class,
        RunningLaravelDuskInProductionProvider::class,
        MissingColumnSolutionProvider::class,
        UnknownValidationSolutionProvider::class,
        MissingMixManifestSolutionProvider::class,
        MissingViteManifestSolutionProvider::class,
        MissingLivewireComponentSolutionProvider::class,
        UndefinedViewVariableSolutionProvider::class,
        GenericLaravelExceptionSolutionProvider::class,
        OpenAiSolutionProvider::class,
        SailNetworkSolutionProvider::class,
        UnknownMysql8CollationSolutionProvider::class,
        UnknownMariadbCollationSolutionProvider::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Ignored Solution Providers
    |--------------------------------------------------------------------------
    |
    | You may specify a list of solution providers (as fully qualified class
    | names) that shouldn't be loaded. Ignition will ignore these classes
    | and possible solutions provided by them will never be displayed.
    |
    */

    'ignored_solution_providers' => [

    ],

    /*
    |--------------------------------------------------------------------------
    | Runnable Solutions
    |--------------------------------------------------------------------------
    |
    | Some solutions that Ignition displays are runnable and can perform
    | various tasks. By default, runnable solutions are only enabled when your
    | app has debug mode enabled and the environment is `local` or
    | `development`.
    |
    | Using the `IGNITION_ENABLE_RUNNABLE_SOLUTIONS` environment variable, you
    | can override this behaviour and enable or disable runnable solutions
    | regardless of the application's environment.
    |
    */

    'enable_runnable_solutions' => env('IGNITION_ENABLE_RUNNABLE_SOLUTIONS', true),

    /*
    |--------------------------------------------------------------------------
    | Remote Path Mapping
    |--------------------------------------------------------------------------
    |
    | If you are using a remote dev server, like Laravel Homestead, Docker, or
    | even a remote VPS, it will be necessary to specify your path mapping.
    |
    */

    'remote_sites_path' => env('IGNITION_REMOTE_SITES_PATH', base_path()),
    'local_sites_path' => env('IGNITION_LOCAL_SITES_PATH', ''),

    /*
    |--------------------------------------------------------------------------
    | Housekeeping Endpoint Prefix
    |--------------------------------------------------------------------------
    |
    | Ignition registers a couple of routes when it is enabled. Below you may
    | specify a route prefix that will be used to host all internal links.
    |
    */

    'housekeeping_endpoint_prefix' => '_ignition',

    /*
    |--------------------------------------------------------------------------
    | Settings File
    |--------------------------------------------------------------------------
    |
    */

    'settings_file_path' => '',

    /*
    |--------------------------------------------------------------------------
    | Recorders
    |--------------------------------------------------------------------------
    |
    */

    'recorders' => [
        DumpRecorder::class,
        JobRecorder::class,
        LogRecorder::class,
        QueryRecorder::class,
    ],

    /*
     * When a key is set, we'll send your exceptions to Open AI to generate a solution
     */

    'open_ai_key' => env('IGNITION_OPEN_AI_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Include arguments
    |--------------------------------------------------------------------------
    |
    | Ignition shows stack traces of exceptions with the arguments that were
    | passed to each method.
    |
    */

    'with_stack_frame_arguments' => true,

    /*
    |--------------------------------------------------------------------------
    | Argument reducers
    |--------------------------------------------------------------------------
    |
    */

    'argument_reducers' => [
        \Spatie\Backtrace\Arguments\Reducers\BaseTypeArgumentReducer::class,
        \Spatie\Backtrace\Arguments\Reducers\ArrayArgumentReducer::class,
        \Spatie\Backtrace\Arguments\Reducers\StdClassArgumentReducer::class,
        \Spatie\Backtrace\Arguments\Reducers\EnumArgumentReducer::class,
        \Spatie\Backtrace\Arguments\Reducers\ClosureArgumentReducer::class,
        \Spatie\Backtrace\Arguments\Reducers\DateTimeArgumentReducer::class,
        \Spatie\Backtrace\Arguments\Reducers\DateTimeZoneArgumentReducer::class,
        \Spatie\Backtrace\Arguments\Reducers\SymphonyRequestArgumentReducer::class,
        \Spatie\LaravelIgnition\ArgumentReducers\ModelArgumentReducer::class,
        \Spatie\LaravelIgnition\ArgumentReducers\CollectionArgumentReducer::class,
        \Spatie\Backtrace\Arguments\Reducers\StringableArgumentReducer::class,
    ],

];
