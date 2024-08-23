<?php

namespace Wahebtalal\WNotifications;

use Filament\Notifications\Notification as BaseNotification;
use Filament\Support\Concerns\HasExtraAttributes;
use Wahebtalal\WNotifications\Concerns\HasBlur;
use Wahebtalal\WNotifications\Concerns\HasExtraProgressAttributes;
use Wahebtalal\WNotifications\Concerns\HasIntervalDelay;
use Wahebtalal\WNotifications\Concerns\HasProgress;
use Wahebtalal\WNotifications\Concerns\HasProgressColor;

class WNotification extends BaseNotification
{
    use HasBlur;
    use HasExtraAttributes;
    use HasExtraProgressAttributes;
    use HasIntervalDelay;
    use HasProgress;
    use HasProgressColor;

    protected string $view = 'wnotifications::notification';

    /**
     * @throws \Exception
     */
    public function toArray(): array
    {

        return array_merge(
            parent::toArray(),
            [
                'intervalDelay' => $this->getIntervalDelay(),
                'progressColor' => $this->getProgressColor(),
                'extraProgressAttributes' => $this->getExtraProgressAttributes(),
                'extraAttributes' => $this->getExtraAttributes(),
                'isBlur' => $this->getIsBlur() ?? false,
                'isProgress' => $this->getisProgress() ?? false,

            ]
        );
    }

    public static function fromArray(array $data): static
    {

        $static = parent::fromArray($data);
        $static->intervalDelay($data['intervalDelay'] ?? config('wnotifications.intervalDelay', 16));
        $static->progressColor($data['progressColor'] ?? null);
        $static->ExtraProgressAttributes($data['extraProgressAttributes'] ?? []);
        $static->extraAttributes($data['extraAttributes'] ?? []);
        $static->isBlur($data['isBlur'] ?? config('wnotifications.Blur.all', false));
        $static->isProgress($data['isProgress'] ?? config('wnotifications.Progress.all', false));

        return parent::fromArray($data);
    }
}
