<?php

namespace App\Controller;

use App\Repository\PlaceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Serializer\PlaceSerializer;
use App\Services\FindPlace;
use App\Services\AuthenticationService;

class PlaceController extends AbstractController
{
    /**
     * @Route("/place", methods={"GET"})
     */
    public function findAllPlaces(Request $request, PlaceRepository $placeRepository, PlaceSerializer $placeSerializer, AuthenticationService $authenticationService): JsonResponse {  
        $user = $authenticationService->isValid($request);

        if (is_null($user)) {
            return $this->json(['error' => 'Not authorized.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $places = $user->getPlaces()->toArray();

        return new JsonResponse(
            $placeSerializer->serialize($places),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/place", methods={"POST"})
     */
    public function find(Request $request, PlaceSerializer $placeSerializer, FindPlace $findPlace, AuthenticationService $authentication): JsonResponse {
        $postData = $placeSerializer->deserialize($request->getContent());

        $user = $authentication->isValid($request);

        if (is_null($user)) {
            return $this->json(['error' => 'Not authorized.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $userPlaces = $user->getPlaces();

        if ($userPlaces->isEmpty() === true) {
            return new JsonResponse(
                $placeSerializer->serialize($postData),
                JsonResponse::HTTP_OK,
                [],
                true
            );
        }

        $place = null;
        foreach($userPlaces as $userPlace) {
            if ($userPlace->getName() === $postData->getName() &&
                $userPlace->getStreet() === $postData->getStreet() &&
                $userPlace->getZipcode() === $postData->getZipcode()) {
                    $place = $userPlace;
                }
        }

        if (is_null($place)) {
            return new JsonResponse(
                $placeSerializer->serialize($postData),
                JsonResponse::HTTP_OK,
                [],
                true
            );
        }

        return new JsonResponse(
            $placeSerializer->serialize($place),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}
