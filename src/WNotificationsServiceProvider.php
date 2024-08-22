<?php

namespace Wahebtalal\WNotifications;

use Filament\Notifications\Notification;
use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Asset;
use Filament\Support\Assets\Css;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Facades\FilamentIcon;
use Illuminate\Filesystem\Filesystem;
use Livewire\Features\SupportTesting\Testable;
use Spatie\LaravelPackageTools\Commands\InstallCommand;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use Wahebtalal\WNotifications\Commands\WNotificationsCommand;
use Wahebtalal\WNotifications\Testing\TestsWNotifications;

class WNotificationsServiceProvider extends PackageServiceProvider
{
    public static string $name = 'wnotifications';

    public static string $viewNamespace = 'wnotifications';

    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package->name(static::$name)
            ->hasCommands($this->getCommands())
            ->hasInstallCommand(function (InstallCommand $command) {
                $command
                    ->publishConfigFile()
                    ->publishMigrations()
                    ->askToRunMigrations()
                    ->askToStarRepoOnGitHub('wahebtalal/wnotifications');
            });

        $configFileName = $package->shortName();

        if (file_exists($package->basePath("/../config/{$configFileName}.php"))) {
            $package->hasConfigFile();
        }

        if (file_exists($package->basePath('/../database/migrations'))) {
            $package->hasMigrations($this->getMigrations());
        }

        if (file_exists($package->basePath('/../resources/lang'))) {
            $package->hasTranslations();
        }

        if (file_exists($package->basePath('/../resources/views'))) {
            $package->hasViews(static::$viewNamespace);
        }
    }

    public function packageRegistered(): void
    {
        //        $this->app->bind(Notification::class, WNotifications::class);
    }

    public function packageBooted(): void
    {
        // Asset Registration
        FilamentAsset::register(
            $this->getAssets(),
            $this->getAssetPackageName()
        );

        FilamentAsset::registerScriptData(
            $this->getScriptData(),
            $this->getAssetPackageName()
        );

        // Icon Registration
        FilamentIcon::register($this->getIcons());

        // Handle Stubs
        //        if (app()->runningInConsole()) {
        //            foreach (app(Filesystem::class)->files(__DIR__ . '/../stubs/') as $file) {
        //                $this->publishes([
        //                    $file->getRealPath() => base_path("stubs/wnotifications/{$file->getFilename()}"),
        //                ], 'wnotifications-stubs');
        //            }
        //        }

        // Testing
        //        Testable::mixin(new TestsWNotifications);
    }

    protected function getAssetPackageName(): ?string
    {
        return 'wahebtalal/wnotifications';
    }

    /**
     * @return array<Asset>
     */
    protected function getAssets(): array
    {
        return [
            // AlpineComponent::make('wnotifications', __DIR__ . '/../resources/dist/components/wnotifications.js'),
            Css::make('wnotifications-styles', __DIR__ . '/../resources/dist/wnotifications.css'),
            Js::make('wnotifications-scripts', __DIR__ . '/../resources/dist/wnotifications.js'),
        ];
    }

    /**
     * @return array<class-string>
     */
    protected function getCommands(): array
    {
        return [
            WNotificationsCommand::class,
        ];
    }

    /**
     * @return array<string>
     */
    protected function getIcons(): array
    {
        return [];
    }

    /**
     * @return array<string>
     */
    protected function getRoutes(): array
    {
        return [];
    }

    /**
     * @return array<string, mixed>
     */
    protected function getScriptData(): array
    {
        return [];
    }

    /**
     * @return array<string>
     */
    protected function getMigrations(): array
    {
        return [
            //            'create_wnotifications_table',
        ];
    }
}
